const { User } = require("../models/user.model");

module.exports = {
  getAllUsers: async () => {
    const users = await User.find().exec();
    return users;
  },
  getUser: async (email) => {
    const user = await User.findOne({ email });
    return user;
  },
  createUser: async (data) => {
    const user = await User.create(data);
    return user;
  },
};
