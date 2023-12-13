const { Schema, model, SchemaTypes } = require("mongoose");

const sectionSchema = new Schema({
  name: { type: SchemaTypes.String, required: true },
  gradeLevel: { type: SchemaTypes.Number, required: true },
  advisor: { type: SchemaTypes.ObjectId, ref: "user", required: true },
  students: [{ type: SchemaTypes.ObjectId, ref: "student" }],
  max: { type: SchemaTypes.Number, default: 50 },
});

const Section = model("section", sectionSchema);

module.exports = Section;
