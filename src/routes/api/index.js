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

module.exports = apiRoute;
