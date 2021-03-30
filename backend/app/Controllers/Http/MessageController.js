"use strict";

const Message = use("App/Models/Message");
const TelegramUser = use("App/Models/Telegram");

class MessageController {
  async create({ request, response, auth }) {
    var user = await auth.getUser();
    const data = request.only(["message", "telegram_id"]);
    if (user.role !== "Admin") {
      return response.status(401).send("");
    }

    user = await TelegramUser.findByOrFail("telegram_id", data.telegram_id);

    const msg = await Message.create({
      message: data.message,
      telegram_id: user.$attributes.id,
    });

    return msg;
  }
}

module.exports = MessageController;
