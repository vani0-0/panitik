const { Schema, model, SchemaTypes } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: SchemaTypes.String, required: true, unique: true },
    name: { type: SchemaTypes.String, required: true },
    role: { type: SchemaTypes.String, enum: ["ADMIN", "TEACHER", "STUDENT"] },
    picture: { type: SchemaTypes.String },
  },
  { timestamps: true }
);

const studentSchema = new Schema({
  studentNo: { type: SchemaTypes.String, unique: true, required: true },
  section: { type: SchemaTypes.ObjectId, req: "section" },
  gradeLevel: { type: SchemaTypes.Number },
  gender: { type: SchemaTypes.String, enum: ["MALE", "FEMALE"] },
  status: {
    type: SchemaTypes.String,
    enum: ["ENROLLED", "NOT ENROLLED", "DROPPED"],
    default: "NOT ENROLLED",
  },
});

const User = model("user", userSchema);
const Student = User.discriminator("student", studentSchema);

module.exports = { User, Student };
