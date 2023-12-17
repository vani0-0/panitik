const Announcement = require("../models/announcement.model");
const Section = require("../models/section.model");
const Subject = require("../models/subject.model");
const { User } = require("../models/user.model");
const sectionController = require("./section.controller");

module.exports = {
  findById: async (id) => {
    try {
      let user = await User.findById(id).exec();
      if (user.role === "STUDENT") {
        const section = await sectionController.findById(user.section);
        return { ...user._doc, section };
      }
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  getAllUsers: async (role) => {
    let query = {};
    if (role) {
      query.role = role;
    } else {
      query.role = { $ne: "STUDENT" };
    }
    const users = await User.find(query).exec();
    return users;
  },

  getUser: async (email, role) => {
    if (role) {
      const user = await User.findOne({ email, role });
      return user;
    }
    const user = await User.findOne({ email });
    return user;
  },

  createUser: async (data) => {
    const user = await User.create(data);
    return user;
  },

  editUser: async (id, data) => {
    const user = await User.findByIdAndUpdate(id, data);
    return user;
  },

  deleteById: async (id) => {
    const user = await User.findById(id);
    await Section.updateMany(
      { advisor: user._id },
      { $set: { advisor: null } }
    );
    await Subject.updateMany(
      { teacher: user._id },
      { $set: { teacher: null } }
    );
    await Announcement.deleteMany({ author: user._id });
    await User.findByIdAndDelete(id);
  },
};
