"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UploadSchema extends Schema {
  up() {
    this.create("uploads", (table) => {
      table.increments();
      table.string("name", 80).notNullable();
      table.string("icon", 80).notNullable();
      table.string("link", 80).unique().notNullable();
      table
        .integer("type_id")
        .unsigned()
        .references("id")
        .inTable("types")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("uploads");
  }
}

module.exports = UploadSchema;
