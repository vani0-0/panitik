const router = require("express").Router();
const passport = require("passport");
const apiRoute = require("./api");
const pageRoute = require("./pages");

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.use(pageRoute);

router.use("/api", apiRoute);

module.exports = router;
