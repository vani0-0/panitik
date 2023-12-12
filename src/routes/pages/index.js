const userController = require("../../controllers/user.controller");
const allowRole = require("../../middlewares/allowRole");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const { User } = require("../../models/user.model");

const pageRouter = require("express").Router();

pageRouter.get("/login", (req, res) => {
  res.render("login");
});

pageRouter.get("/", isAuthenticated, (req, res) => {
  res.render("index", { account: req.user });
});

pageRouter.get(
  "/user",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const users = await userController.getAllUsers();
    res.render("user/users_list", { account: req.user, users });
  }
);

pageRouter.get(
  "/user/new",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    res.render("user/create_user", { account: req.user, user: new User() });
  }
);

pageRouter
  .route("/user/:id")
  .get((req, res) => {
    res.send(`User ID to get is ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`User ID edit is ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`User ID delete is ${req.params.id}`);
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
