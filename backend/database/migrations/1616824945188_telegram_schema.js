"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TelegramSchema extends Schema {
  up() {
    this.create("telegrams", (table) => {
      table.increments();
      table.string("name", 40).notNullable();
      table.string("telegram_id", 30).unique().notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("telegrams");
  }
}

module.exports = TelegramSchema;
