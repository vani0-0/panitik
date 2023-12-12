const userController = require("../../controllers/user.controller");
const { User } = require("../../models/user.model");

const apiRoute = require("express").Router();

apiRoute.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
    console.log("<--User Logged Out-->");
  });
});

apiRoute.get("/user/check-email", async function (req, res) {
  const email = req.query.email;
  console.log(email);

  const exists = await userController.getUser(email);
  res.json({ exists });
});

apiRoute.post("/user/create", async function (req, res) {
  const isExist = await userController.getUser(req.body.email);

  if (isExist) {
    return res.redirect("/user");
  }

  const user = await userController.createUser({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  });
  res.redirect("users");
});

module.exports = apiRoute;
