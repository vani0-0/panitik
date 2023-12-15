const sectionController = require("../../controllers/section.controller"); 
const userController = require("../../controllers/user.controller");
const allowRole = require("../../middlewares/allowRole");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const { Student } = require("../../models/user.model");

const studentRouter = require("express").Router();

studentRouter.get("/", isAuthenticated, allowRole(["ADMIN"]), (req, res) => {
  res.render("admin/student/student_list", { account: req.user });
});

studentRouter.get(
  "/new",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const sections = await sectionController.getAllSections();
    res.render("admin/student/enroll_student", {
      account: req.user,
      student: new Student(),
      sections,
      editMode: false,
    });
  }
);

studentRouter.get(
  "/:id",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const student = await userController.findById(req.params.id);
    console.log(student)
    res.render("admin/student/student_info", { account: req.user, student });
  }
);

module.exports = studentRouter;
