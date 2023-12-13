const announcementRoute = require("./announcement");
const sectionRoute = require("./section");
const userRoute = require("./user");

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

apiRoute.use("/user", userRoute);
apiRoute.use("/section", sectionRoute);
apiRoute.use('/announcement', announcementRoute)
module.exports = apiRoute;
