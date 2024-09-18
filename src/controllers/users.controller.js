const User = require('../models/user.model');

const getAllActiveUsers = async(req, res) => {

  try {
    const usersList = await User.find({ active: true }).select('-password');
    return res.status(200).json(usersList);
  } catch(error) {
    return res.status(400).json(error['message']);
  }

};

module.exports = {
  getAllActiveUsers
};
