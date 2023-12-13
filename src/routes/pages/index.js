const allowRole = require("../../middlewares/allowRole");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const announcementRouter = require("./announcements.page");
const sectionRouter = require("./section.page");
const userRouter = require("./user.page");

const pageRouter = require("express").Router();

pageRouter.use(userRouter)
pageRouter.use(sectionRouter)
pageRouter.use(announcementRouter)

pageRouter.get("/login", (req, res) => {
  res.render("login");
});

pageRouter.get("/", isAuthenticated, (req, res) => {
  res.render("index", { account: req.user });
});

pageRouter.get(
  "/student",
  isAuthenticated,
  allowRole(["ADMIN"]),
  (req, res) => {
    res.render("index", { account: req.user });
  }
);

pageRouter.get(
  "/announcement",
  isAuthenticated,
  allowRole(["ADMIN"]),
  (req, res) => {
    res.render("index", { account: req.user });
  }
);

module.exports = pageRouter;
