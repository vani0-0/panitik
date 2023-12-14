const userController = require("../../controllers/user.controller");
const allowRole = require("../../middlewares/allowRole");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const { User } = require("../../models/user.model");

const userRouter = require("express").Router();

userRouter.get(
  "/",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    res.render("user/users_list", { account: req.user });
  }
);

userRouter.get(
  "/new",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    res.render("user/create_user", {
      account: req.user,
      user: new User(),
      editMode: false,
    });
  }
);

userRouter.get(
  "/:id",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const user = await userController.findById(req.params.id);
    if (!user) {
      res.render("user/users_list", {
        account: req.user,
        errorMessage: "ID does not exist",
      });
    }
    res.render("user/edit_user", { account: req.user, user, editMode: true });
  }
);

userRouter.get(
  "/delete/:id",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    await userController.deleteById(req.params.id);
    res.render("user/users_list", {
      account: req.user,
      errorMessage: "User deleted",
    });
  }
);

module.exports = userRouter;
