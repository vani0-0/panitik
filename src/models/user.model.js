const { Schema, model, SchemaTypes } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: SchemaTypes.String, required: true, unique: true },
    name: { type: SchemaTypes.String, required: true },
    role: { type: SchemaTypes.String, enum: ["ADMIN", "TEACHER", "STUDENT"] },
  },
  { timestamps: true }
);

const studentSchema = new Schema({
  section: { type: SchemaTypes.String },
});

const User = model("user", userSchema);
const Student = User.discriminator("STUDENT", studentSchema);

module.exports = { User, Student };
