const Announcement = require("../models/announcement.model");

module.exports = {
  createAnnouncement: async (data) => {
    const announcement = new Announcement(data);
    await announcement.save();
    return announcement;
  },

  editAnnouncement: async (id, data) => {
    const announcement = await Announcement.findByIdAndUpdate(id, data);
    return announcement;
  },

  getAllAnnouncements: async () => {
    const announcements = await Announcement.find()
      .populate("author")
      .sort({ createdAt: "desc" });
    const formattedAnnouncements = announcements.map((announcement) => ({
      ...announcement._doc,
      author: announcement.author,
      createdAt: formatCreatedAt(announcement.createdAt),
    }));
    return formattedAnnouncements;
  },

  findById: async (id) => {
    const announcement = await Announcement.findById(id);
    return announcement;
  },

  deleteById: async (id) => {
    await Announcement.findByIdAndDelete(id);
  },
};

function formatCreatedAt(createdAt) {
  const formattedDate = new Date(createdAt).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  });
  return `Posted on ${formattedDate}`;
}
