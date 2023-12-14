const { User } = require("../models/user.model");

module.exports = {
  findById: async (id) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getAllUsers: async () => {
    const users = await User.find().exec();
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
