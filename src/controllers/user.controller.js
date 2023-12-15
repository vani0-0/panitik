const { User } = require("../models/user.model");
const sectionController = require("./section.controller");

module.exports = {
  findById: async (id) => {
    try {
      let user = await User.findById(id).exec();
      if (user.role === "STUDENT") {
        const section = await sectionController.findById(user.section)
        return {...user._doc, section};
      }
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  
  getAllUsers: async () => {
    const users = await User.find({ role: {$ne: 'STUDENT'} }).exec();
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
    await User.findByIdAndDelete(id);
  },
};
