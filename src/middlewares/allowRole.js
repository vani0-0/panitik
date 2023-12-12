function allowRole(roles) {
  return function (req, res, next) {
    if (roles.includes(req.user.role)) {
      return next();
    }
    res.redirect("/");
  };
}
module.exports = allowRole;
