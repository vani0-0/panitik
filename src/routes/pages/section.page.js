const sectionController = require("../../controllers/section.controller");
const allowRole = require("../../middlewares/allowRole");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const Section = require("../../models/section.model");

const sectionRouter = require("express").Router();

sectionRouter.get("/", isAuthenticated, allowRole(["ADMIN"]), (req, res) => {
  res.render("admin/section/section_list", { account: req.user });
});

sectionRouter.get("/new", isAuthenticated, allowRole(["ADMIN"]), (req, res) => {
  res.render("admin/section/create_section", {
    account: req.user,
    section: new Section(),
    editMode: false,
  });
});

sectionRouter.get(
  "/:id",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const section = await sectionController.findById(req.params.id);
    if (!section) {
      req.render("admin/section/section_list", {
        account: req.user,
        errorMessage: "ID does not exist",
      });
    }
    console.log(section)
    res.render("admin/section/edit_section", {
      account: req.user,
      section,
      editMode: true,
    });
  }
);

sectionRouter.get(
  "/delete/:id",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    await sectionController.deleteById(req.params.id);
    res.render("admin/section/section_list", {
      account: req.user,
      errorMessage: "Section deleted",
    });
  }
);

module.exports = sectionRouter;
