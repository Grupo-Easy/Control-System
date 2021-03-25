"use strict";

const User = use("App/Models/User");

class AuthController {
  async create({ request, response }) {
    const data = request.only([
      "name",
      "username",
      "email",
      "role",
      "password",
    ]);
    const token = request.only(["key"]);
    if (token.key === process.env.APP_KEY) {
      try {
        const response = await User.create(data);
        delete response.$attributes.id;
        delete response.$attributes.password;

        return response;
      } catch (err) {
        if (err.constraint === "users_username_unique") {
          return response
            .status(409)
            .json({ status: "This username or email is already in use" });
        }
        return response.status(500).send(err);
      }
    }
    return response.status(401).json({
      Error: "Acess denied",
    });
  }

  async login({ request, response, auth }) {
    try {
      const { authorization } = request.headers();
      var [email, password] = await Buffer.from(
        authorization.split(" ")[1],
        "base64"
      )
        .toString("utf-8")
        .split(":");

      const jwt = await auth.attempt(email, password);
      return { token: jwt.token };
    } catch (err) {
      return response.status(401).json({
        status: "Incorrect username or password",
      });
    }
  }

  async me({ response, auth }) {
    try {
      const data = await auth.getUser();
      delete data.$attributes.id;
      delete data.$attributes.password;
      return data;
    } catch (err) {
      return response.status(401).send("");
    }
  }

  async delete({ request, response, auth }) {
    const data = await auth.getUser();
    const { id } = await request.only(["id"]);
    try {
      if (data.$attributes.role === "Admin") {
        const user = await User.findByOrFail("id", id);
        await user.delete();
        return response.status(200).send(user);
      }
    } catch (err) {
      console.log(err);
      return response.status(401).send(err);
    }
  }

  async users({ response, auth }) {
    const data = await auth.getUser();
    if (data.role !== "Admin") {
      return response.status(401).send("");
    }

    const users = [];
    const db = await User.all();

    for (let i = 0; i < db.rows.length; i++) {
      const element = db.rows[i];
      users.push({
        id: element.id,
        name: element.name,
        username: element.username,
        email: element.email,
      });
    }

    return users;
  }
}

module.exports = AuthController;
