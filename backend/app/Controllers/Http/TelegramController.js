"use strict";

const Client = use("App/Models/Telegram");

class TelegramController {
  async index({ response, auth }) {
    const user = await auth.getUser();

    if (user.role !== "Admin") {
      return response.status(404).send();
    }

    const data = await Client.all();
    return data;
  }

  async create({ response, request, auth }) {
    const user = await auth.getUser();
    const data = request.only(["name", "telegram_id"]);

    if (user.role !== "Admin") {
      return response.status(404).send();
    }

    const newUser = await Client.create(data);
    return newUser;
  }

  async search({ response, params, auth }) {
    const user_id = params.user_id;
    const user = await auth.getUser();

    if (user.role !== "Admin") {
      return response.status(404).send();
    }
    try {
      const data = await Client.findByOrFail("telegram_id", user_id);
      return data;
    } catch (err) {
      return response.status(404).json([]);
    }
  }

  async show() {}
}

module.exports = TelegramController;
