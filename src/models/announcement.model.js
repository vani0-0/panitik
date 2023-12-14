const { Schema, model, SchemaTypes } = require("mongoose");

const announcementSchema = new Schema(
  {
    title: { type: SchemaTypes.String, required: true },
    content: { type: SchemaTypes.String, required: true },
    picture: { type: SchemaTypes.String },
    author: { type: SchemaTypes.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const Announcement = model("announcement", announcementSchema);
module.exports = Announcement;
