const announcementController = require("../../controllers/announcement.controller");
const allowRole = require("../../middlewares/allowRole");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const announcementRouter = require("./announcements.page");
const sectionRouter = require("./section.page");
const studentRouter = require("./student.page");
const subjectRouter = require("./subjects.page");
const userRouter = require("./user.page");

const pageRouter = require("express").Router();

pageRouter.use('/user', userRouter);
pageRouter.use('/section', sectionRouter);
pageRouter.use('/announcements', announcementRouter);
pageRouter.use('/student', studentRouter)
pageRouter.use('/subject', subjectRouter)

pageRouter.get("/login", (req, res) => {
  res.render("login");
});

pageRouter.get("/", isAuthenticated, async (req, res) => {
  if (req.user.role === "ADMIN") {
    const announcements = await announcementController.getAllAnnouncements();
    return res.render("admin/admin", { account: req.user, announcements });
  }
  if (req.user.role === "TEACHER") {
    console.log(req.user)
    return res.render("teacher/teacher", { account: req.user });
  }
  if (req.user.role === "STUDENT") {
    return res.render("student/student", { account: req.user });
  }
});

module.exports = pageRouter;
