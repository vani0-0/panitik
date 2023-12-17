const { Schema, model, SchemaTypes } = require("mongoose");

const sectionSchema = new Schema({
  name: { type: SchemaTypes.String, required: true },
  gradeLevel: { type: SchemaTypes.Number, required: true },
  advisor: { type: SchemaTypes.ObjectId, ref: "user" },
  students: [{ type: SchemaTypes.ObjectId, ref: "student" }],
  max: { type: SchemaTypes.Number, default: 50 },
  subjects: [{ type: SchemaTypes.ObjectId, ref: "subject" }],
});

const Section = model("section", sectionSchema);

module.exports = Section;
