"use strict";

module.exports = {
  origin: true,

  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],

  headers: true,

  exposeHeaders: true,

  credentials: true,

  maxAge: 90,
};
