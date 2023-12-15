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
    editMode: true,
  });
});

module.exports = subjectRouter;
