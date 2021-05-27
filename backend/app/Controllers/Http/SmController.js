'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Message = use("App/Models/Sm")
var messagebird = require('messagebird')(process.env.MESSAGEBIRD_KEY);

/**
 * Resourceful controller for interacting with sms
 */
class SmController {

  async index() {
    const sms = await Message.all()
    return sms;
  }

  async create({ request, response, view }) {
    const data = request.only(["number", "channel_id", "message", "type"])

    switch (data.type) {
      case "sms":
        var params = {
          'originator': 'MessageBird',
          'recipients': [
            data.number
          ],
          'body': data.message
        };

        messagebird.messages.create(params, function (err, response) {
          if (err) {
            return err
          }
          return response
        });
        break;
      case "Telegram":
        console.log("Teste")
        return "teste"
    }
  }


  async store({ request, response }) {
  }


  async show({ params, request, response, view }) {
  }

}

module.exports = SmController
