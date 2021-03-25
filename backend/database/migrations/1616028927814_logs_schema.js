"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LogsSchema extends Schema {
  up() {
    this.create("logs", (table) => {
      table.increments();
      table.string("action", 80);
      table.timestamps();
    });
  }

  down() {
    this.drop("logs");
  }
}

module.exports = LogsSchema;
