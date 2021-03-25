"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with uploads
 */
const Helpers = use("Helpers");
const TypeName = use("App/Models/Type");
const UploadFile = use("App/Models/Upload");

class UploadController {
  async index({ request, response }) {
    try {
      const data = await UploadFile.all();
      return response.status(200).json(data);
    } catch (err) {
      return response.status(500).json(err);
    }
  }

  async file({ params, response }) {
    return response.download(Helpers.publicPath(`files/${params.file}`));
  }

  async upload({ request, response }) {
    const data = request.headers();
    const file = request.file("file", {
      size: "8mb",
    });
    let icon_name = {
      pdf: "file pdf outline",
      au: "file audio outline",
      xlm: "file excel outline",
      xlb: "file excel outline",
      "vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        "file excel outline",
      "vnd.openxmlformats-officedocument.wordprocessingml.document":
        "file word outline",
      jpg: "file image outline",
      png: "file image outline",
      mp4: "file video outline",
      wav: "file video outline",
      mp3: "file audio outline",
      wma: "file audio outline",
      jpeg: "file image outline",
      xlsx: "file excel outline",
      ppt: "file powerpoint outline",
      pps: "file powerpoint outline",
    };
    let extension_name = {
      "vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
      "vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    };

    try {
      let icon = icon_name[file.subtype] || "file outline";
      let extension = extension_name[file.subtype] || file.subtype;

      const replacer = new RegExp("../", "g");

      console.log(icon);
      console.log(file.subtype);
      const saveFile = await UploadFile.create({
        name: data.name.replace(replacer, ""),
        icon: icon,
        link: `/${data.name.replace(replacer, "")}.${extension}`,
        type_id: data.type,
      });

      await file.move(Helpers.publicPath("files"), {
        name: `${data.name.replace(replacer, "")}.${extension}`,
      });

      if (!file.moved()) {
        return file.error();
      }

      return response.status(201).send();
    } catch (err) {
      if (
        err.detail ===
        `Key (link)=(/${data.name}.${file.subtype}) already exists.`
      ) {
        return response.status(200).json({
          status: "File already exists",
        });
      }
      console.log(err);
      return response.status(500).send(err);
    }
  }

  async searchByType({ params }) {
    const { id } = await TypeName.findByOrFail("name", params.type);
    const db = await UploadFile.query()
      .select("*")
      .where("type_id", id)
      .fetch();
    return db;
  }
}

module.exports = UploadController;
