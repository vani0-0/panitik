const Section = require("../models/section.model");
const Subject = require("../models/subject.model");
const crypto = require("crypto");

const generateRandomString = (length) => {
  return crypto
    .randomBytes(length)
    .toString("hex")
    .toUpperCase()
    .substring(0, length);
};

module.exports = {
  getAllSubjects: async (req, res) => {
    const subjects = await Subject.find().populate(["teacher", "section"]);
    return subjects;
  },
  createSubject: async (data) => {
    const randomString = generateRandomString(6);
    const subject = new Subject({ ...data, subjectCode: randomString });
    await subject.save();
    await Section.findByIdAndUpdate(data.section, {
      $push: { subjects: subject._id },
    });
    return subject;
  },

  findById: async (id) => {
    try {
      const subject = await Subject.findById(id).populate([
        "teacher",
        "section",
      ]);
      return subject;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  updateSubject: async (id, data) => {
    await Subject.findByIdAndUpdate(id, data);
  },
};
