const announcementController = require("../../controllers/announcement.controller");
const allowRole = require("../../middlewares/allowRole");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const Announcement = require("../../models/announcement.model");

const announcementRouter = require("express").Router();

announcementRouter.get("/", isAuthenticated, async (req, res) => {
  const announcements = await announcementController.getAllAnnouncements();
  if (req.user.role === "ADMIN")
    res.render("admin/announcement/announcements", {
      account: req.user,
      announcements,
    });
  else {
    res.render("announcement/announcements", {
      account: req.user,
      announcements,
    });
  }
});

announcementRouter.get(
  "/create",
  isAuthenticated,
  allowRole(["ADMIN"]),
  (req, res) => {
    res.render("admin/announcement/create_announcement", {
      account: req.user,
      announcement: new Announcement(),
    });
  }
);

announcementRouter.get(
  "/edit/:id",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const announcement = await announcementController.findById(req.params.id);
    if (!announcement) {
      const announcements = await announcementController.getAllAnnouncements();
      res.render("admin/announcement/announcements", {
        account: req.user,
        announcements,
        errorMessage: "ID does not exist",
      });
    }
    res.render("admin/announcement/edit_announcement", {
      account: req.user,
      announcement,
    });
  }
);

announcementRouter.get(
  "/delete/:id",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    await announcementController.deleteById(req.params.id);
    const announcements = await announcementController.getAllAnnouncements();
    res.render("admin/announcement/announcements", {
      account: req.user,
      announcements,
    });
  }
);

module.exports = announcementRouter;
