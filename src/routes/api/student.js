const studentController = require("../../controllers/student.controller");
const allowRole = require("../../middlewares/allowRole");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const studentRoute = require("express").Router();

studentRoute.get(
  "/all",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const gradeLevel = req.query.gradeLevel;
    const section = req.query.section;
    const students = await studentController.queryStudents(gradeLevel, section);
    res.status(200).send(students);
  }
);

studentRoute.post(
  "/create",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const studentNo = await studentController.generateStudentNo();
    await studentController.createStudent({
      role: "STUDENT",
      name: req.body.name,
      email: req.body.email,
      gradeLevel: req.body.grade,
      gender: req.body.gender,
      section: req.body.section,
      studentNo,
    });
    res.redirect("/student");
  }
);

studentRoute.post(
  "/edit/:id",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    console.log(req.body);
    await studentController.editStudent(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      gradeLevel: req.body.grade,
      gender: req.body.gender,
      section: req.body.section,
      status: req.body.status,
    });
    res.redirect('/student')
  }
);
module.exports = studentRoute;
