const { Schema, model, SchemaTypes } = require("mongoose");

const announcementSchema = new Schema(
  {
    title: { type: SchemaTypes.String, required: true },
    content: { type: SchemaTypes.String, required: true },
    picture: { type: SchemaTypes.String },
    author: {
      name: { type: SchemaTypes.String },
      picture: { type: SchemaTypes.String },
      email: { type: SchemaTypes.String, required: true },
    },
  },
  { timestamps: true }
);

const Announcement = model("announcement", announcementSchema);
module.exports = Announcement;
