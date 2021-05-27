'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SmsSchema extends Schema {
  up() {
    this.create('sms', (table) => {
      table.increments()
      table.string("number", 40).notNullable();
      table.string("message", 500).notNullable();
      table.timestamps()
    })
  }

  down() {
    this.drop('sms')
  }
}

module.exports = SmsSchema
