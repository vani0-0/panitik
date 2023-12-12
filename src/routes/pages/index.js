const userController = require("../../controllers/user.controller");
const allowRole = require("../../middlewares/allowRole");
const isAuthenticated = require("../../middlewares/isAuthenticated");

const pageRouter = require("express").Router();

pageRouter.get("/login", (req, res) => {
  res.render("login");
});

pageRouter.get("/", isAuthenticated, (req, res) => {
  res.render("index", req.user);
});

pageRouter.get(
  "/user",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const users = await userController.getAllUsers();
    res.render("users_list", { ...req.user, users });
  }
);

pageRouter.get(
  "/user/new",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    res.render("create_user", req.user);
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
    res.render("index", req.user);
  }
);

pageRouter.get(
  "/announcement",
  isAuthenticated,
  allowRole(["ADMIN"]),
  (req, res) => {
    res.render("index", req.user);
  }
);

module.exports = pageRouter;
