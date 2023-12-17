const subjectController = require("../../controllers/subject.controller");
const allowRole = require("../../middlewares/allowRole");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const Subject = require("../../models/subject.model");

const subjectRouter = require("express").Router();

subjectRouter.get("/", isAuthenticated, allowRole(["ADMIN"]), (req, res) => {
  res.render("admin/subject/subject_list", { account: req.user });
});

subjectRouter.get("/new", isAuthenticated, allowRole(["ADMIN"]), (req, res) => {
  res.render("admin/subject/create_subject", {
    account: req.user,
    subject: new Subject(),
    editMode: false,
  });
});

subjectRouter.get(
  "/:id",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const subject = await subjectController.findById(req.params.id);
    res.render("admin/subject/edit_subject", {
      account: req.user,
      subject,
      editMode: true,
    });
  }
);

module.exports = subjectRouter;
