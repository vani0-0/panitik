const allowRole = require("../../middlewares/allowRole");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const Section = require("../../models/section.model");

const sectionRouter = require("express").Router();

sectionRouter.get(
  "/section",
  isAuthenticated,
  allowRole(["ADMIN"]),
  (req, res) => {
    res.render("section/section_list", { account: req.user });
  }
);

sectionRouter.get(
  "/section/new",
  isAuthenticated,
  allowRole(["ADMIN"]),
  (req, res) => {
    res.render("section/create_section", {
      account: req.user,
      section: new Section(),
      editMode: false,
    });
  }
);

module.exports = sectionRouter;
