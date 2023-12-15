const { Schema, model, SchemaTypes } = require("mongoose");

const subjectSchema = new Schema({
  subjectCode: { type: SchemaTypes.String, required: true, unique: true },
  name: { type: SchemaTypes.String, required: true },
  gradeLevel: { type: SchemaTypes.Number, required: true },
  section: { type: SchemaTypes.ObjectId, required: true, ref: "section" },
  teacher: { type: SchemaTypes.ObjectId, ref: "user" },
  students: [{ type: SchemaTypes.ObjectId, ref: "student" }],
});

const Subject = model("subject", subjectSchema);
module.exports = Subject;
