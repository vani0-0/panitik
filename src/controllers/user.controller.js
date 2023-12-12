const { User } = require("../models/user.model");

module.exports = {
  getAllUsers: async () => {
    const users = await User.find().exec();
    return users;
  },
};
