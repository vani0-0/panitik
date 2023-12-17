const moment = require("moment");
const { Student } = require("../models/user.model");
const Section = require("../models/section.model");

module.exports = {
  queryStudents: async (gradeLevel, section) => {
    try {
      let query = {};
      if (gradeLevel) {
        query.gradeLevel = gradeLevel;
      }
      if (section && section !== "all") {
        const sectionData = await Section.findOne({ name: section });
        if (sectionData) {
          query.section = sectionData._id;
        } else return [];
      }
      const students = await Student.find(query);
      return students;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  generateStudentNo: async () => {
    const prefix = "PA";
    const currentYear = moment().format("YYYY");
    const number = (await Student.countDocuments()) + 1;

    const studentNumber = number.toString().padStart(5, "0");
    const studentNo = `${prefix}${currentYear}${studentNumber}`;

    return studentNo;
  },

  createStudent: async (data) => {
    const student = new Student(data);
    await student.save();
    await Section.findByIdAndUpdate(data.section, {
      $push: { students: student._id },
    });
  },

  editStudent: async (id, data) => {
    await Student.findByIdAndUpdate(id, data);
  },
};
