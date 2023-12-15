const sectionController = require("../../controllers/section.controller");
const userController = require("../../controllers/user.controller");
const allowRole = require("../../middlewares/allowRole");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const sectionRoute = require("express").Router();

sectionRoute.get(
  "/all",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const sections = await sectionController.getAllSections();
    res.status(200).send(sections);
  }
);

sectionRoute.get(
  "/",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const sections = await sectionController.getByGrades(req.query.grade)
    res.status(200).send(sections)
  }
);

sectionRoute.post(
  "/create",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const user = await userController.getUser(req.body.advisor);
    await sectionController.createSection({
      name: req.body.name,
      gradeLevel: req.body.gradeLevel,
      advisor: user._id,
      max: req.body.max,
    });

    res.redirect("/section");
  }
);

sectionRoute.post(
  "/edit/:id",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const user = await userController.getUser(req.body.advisor);
    await sectionController.editSection(req.params.id, {
      name: req.body.name,
      gradeLevel: req.body.gradeLevel,
      advisor: user._id,
      max: req.body.max,
    });
    res.redirect("/section");
  }
);

module.exports = sectionRoute;
