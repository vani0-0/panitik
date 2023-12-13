const userController = require("../../controllers/user.controller");
const allowRole = require("../../middlewares/allowRole");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const { User } = require("../../models/user.model");

const userRouter = require("express").Router();

userRouter.get(
  "/user",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const users = await userController.getAllUsers();
    res.render("user/users_list", { account: req.user, users });
  }
);

userRouter.get(
  "/user/new",
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
  "/user/:id",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const user = await userController.findById(req.params.id);
    if (!user) {
      const users = await userController.getAllUsers();
      res.render("user/users_list", {
        account: req.user,
        users,
        errorMessage: "ID does not exist",
      });
    }
    res.render("user/edit_user", { account: req.user, user, editMode: true });
  }
);

userRouter.get(
  "/user/delete/:id",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    await userController.deleteById(req.params.id);
    const users = await userController.getAllUsers();
    res.render("user/users_list", { account: req.user, users, errorMessage: 'User deleted'});
  }
);

module.exports = userRouter;