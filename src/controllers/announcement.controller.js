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
    console.log(formattedAnnouncements);
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
  const options = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  };
  const formattedDate = new Date(createdAt).toLocaleString("en-US", options);
  return `Posted on ${formattedDate}`;
}
