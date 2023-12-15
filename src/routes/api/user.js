const allowRole = require("../../middlewares/allowRole");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const userController = require("../../controllers/user.controller");
const userRoute = require("express").Router();

userRoute.get("/check-email", isAuthenticated, async function (req, res) {
  const email = req.query.email;
  const role = req.query.role;
  const exists = await userController.getUser(email, role);
  res.json({ exists });
});

userRoute.get(
  "/all",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async function (req, res) {
    const role = req.query.role;
    const users = await userController.getAllUsers(role);
    res.status(200).send(users);
  }
);

userRoute.post(
  "/create",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async function (req, res) {
    const isExist = await userController.getUser(req.body.email);
    if (isExist) {
      return res.redirect("/user");
    }

    await userController.createUser({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    });
    res.redirect("/user");
  }
);

userRoute.post(
  "/edit/:id",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async function (req, res) {
    await userController.editUser(req.params.id, {
      name: req.body.name,
      role: req.body.role,
    });
    res.redirect('/user')
  }
);

module.exports = userRoute