const User = require('../models/user.model');

const getAllActiveUsers = async(req, res) => {

  try {
    const usersList = await User.find({ active: true }).select('-password');
    return res.status(200).json(usersList);
  } catch(error) {
    return res.status(400).json(error['message']);
  }

};

const disableUser = async(req, res) => {

  const user = await User.findById(req['params']['id']);
  
  if (!user) return res.status(400).json({ message: 'User not found'});
  
  user.active = false;
  user.save({ validateBeforeSave: false });

  return res.status(200).json({ message: 'Operation successfully completed'});

};

module.exports = {
  getAllActiveUsers,
  disableUser
};
