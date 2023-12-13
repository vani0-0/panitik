const announcementController = require("../../controllers/announcement.controller");
const allowRole = require("../../middlewares/allowRole");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const announcementRoute = require("express").Router();

announcementRoute.post(
  "/create",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    await announcementController.createAnnouncement({
      title: req.body.title,
      content: req.body.content,
      picture: req.body.myFile,
      author: { ...req.user },
    });
    res.send(req.body);
  }
);

announcementRoute.post(
  "/edit/:id",
  isAuthenticated,
  allowRole(["ADMIN"]),
  async (req, res) => {
    await announcementController.editAnnouncement(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      picture: req.body.myFile,
    });
    res.send(req.body);
  }
);

module.exports = announcementRoute;
