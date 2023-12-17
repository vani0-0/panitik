const subjectController = require("../../controllers/subject.controller");
const allowRole = require("../../middlewares/allowRole");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const subjectRoute = require("express").Router();

subjectRoute.get(
  "/all",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const subjects = await subjectController.getAllSubjects();
    res.status(200).send(subjects);
  }
);

subjectRoute.post(
  "/create",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    await subjectController.createSubject({
      name: req.body.name,
      teacher: req.body.teacher,
      gradeLevel: req.body.grade,
      section: req.body.section,
    });
    res.redirect("/subject");
  }
);

subjectRoute.post(
  "/edit/:id",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    await subjectController.updateSubject(req.params.id, {
      name: req.body.name,
      teacher: req.body.teacher,
      gradeLevel: req.body.grade,
      section: req.body.section,
    });
    res.redirect("/subject");
  }
);

module.exports = subjectRoute;
