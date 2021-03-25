"use strict";

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use("Env");

module.exports = {
  authenticator: "jwt",

  session: {
    serializer: "lucid",
    model: "App/Models/User",
    scheme: "session",
    uid: "email",
    password: "password",
  },

  basic: {
    serializer: "lucid",
    model: "App/Models/User",
    scheme: "basic",
    uid: "email",
    password: "password",
  },

  jwt: {
    serializer: "lucid",
    model: "App/Models/User",
    scheme: "api",
    uid: "email",
    password: "password",
    options: {
      secret: Env.get("APP_KEY"),
      expiresIn: "24h",
    },
  },

  api: {
    serializer: "lucid",
    model: "App/Models/User",
    scheme: "api",
    uid: "email",
    password: "password",
  },
};
