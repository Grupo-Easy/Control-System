"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TypeSchema extends Schema {
  up() {
    this.create("types", (table) => {
      table.increments();
      table.string("name", 80).notNullable().unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("types");
  }
}

module.exports = TypeSchema;
