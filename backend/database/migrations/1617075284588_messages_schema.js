"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MessagesSchema extends Schema {
  up() {
    this.create("messages", (table) => {
      table.increments();
      table.string("message", 256).notNullable();
      table
        .integer("telegram_id")
        .unsigned()
        .references("id")
        .inTable("telegrams")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("messages");
  }
}

module.exports = MessagesSchema;
