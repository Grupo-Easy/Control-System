"use strict";

const Helpers = use("Helpers");

const Route = use("Route");

Route.group(() => {
  Route.get("/login", "AuthController.login");
  Route.post("/signup", "AuthController.create");
  Route.get("/me", "AuthController.me").middleware("auth");
  Route.get("/users", "AuthController.users").middleware("auth");
  Route.delete("/", "AuthController.delete").middleware("auth");
}).prefix("api/v1");

Route.group(() => {
  Route.get("/", "TypeController.index");
  Route.post("/", "TypeController.create");
  Route.delete("/", "TypeController.delete");
})
  .prefix("api/v1/types")
  .middleware("auth");

Route.group(() => {
  Route.get("/", "UploadController.index");
  Route.post("/", "UploadController.upload");
  Route.get("/:file", "UploadController.file");
  Route.get("/type/:type", "UploadController.searchByType");
})
  .prefix("api/v1/files")
  .middleware("auth");

Route.group(() => {
  Route.get("/", "SmController.index");
  Route.post("/", "SmController.create");
})
  .prefix("api/v1/chat")
  .middleware("auth");

Route.group(() => {
  Route.get("/", "TelegramController.index");
  Route.post("/", "TelegramController.create");
  Route.post("/message", "MessageController.create");
  Route.get("/:user_id", "TelegramController.search");
  Route.post("/message/send", "TelegramController.send");
})
  .prefix("api/v1/telegram")
  .middleware("auth");
