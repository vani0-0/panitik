const announcementController = require("../../controllers/announcement.controller");
const allowRole = require("../../middlewares/allowRole");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const Announcement = require("../../models/announcement.model");

const announcementRouter = require("express").Router();

announcementRouter.get(
  "/announcements",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const announcements = await announcementController.getAllAnnouncements();
    res.render("announcement/announcements", {
      account: req.user,
      announcements,
    });
  }
);

announcementRouter.get(
  "/announcements/create",
  isAuthenticated,
  allowRole(["ADMIN"]),
  (req, res) => {
    res.render("announcement/create_announcement", {
      account: req.user,
      announcement: new Announcement(),
    });
  }
);

announcementRouter.get(
  "/announcements/edit/:id",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    const announcement = await announcementController.findById(req.params.id);
    if (!announcement) {
      const announcements = await announcementController.getAllAnnouncements();
      res.render("announcement/announcements", {
        account: req.user,
        announcements,
        errorMessage: "ID does not exist",
      });
    }
    res.render("announcement/edit_announcement", {
      account: req.user,
      announcement,
    });
  }
);

announcementRouter.get(
  "/announcements/delete/:id",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    await announcementController.deleteById(req.params.id);
    const announcements = await announcementController.getAllAnnouncements();
    res.render("announcement/announcements", {
      account: req.user,
      announcements,
    });
  }
);

module.exports = announcementRouter;
