"use strict";

const Type = use("App/Models/Type");

class TypeController {
  async index() {
    return await Type.all();
  }

  async create({ request, response, auth }) {
    const data = request.only(["name"]);
    const user = await auth.getUser();
    try {
      if (user.$attributes.role === "Admin") {
        const typing = await Type.create(data);
        return response.status(201).json(typing);
      }
      return response.status(401).send("");
    } catch (err) {
      return response.status(500).send(err);
    }
  }

  async delete({ request, response, auth }) {
    const user = await auth.getUser();
    const { name } = request.all();
    if (user.role === "Admin") {
      try {
        const typing = await Type.findByOrFail("name", name);
        await typing.delete();
        return response.status(200).send("");
      } catch (err) {
        return response.status(500).send(err);
      }
    }
    return response.status(401).send("");
  }
}

module.exports = TypeController;
