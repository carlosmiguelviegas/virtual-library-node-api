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

  if (req['params']['id'] === req['user']['_id'].toString()) return res.status(400).json({ message: 'User cannot disable himself.'});

  const user = await User.findById(req['params']['id']);

  if (!user) return res.status(400).json({ message: 'User not found.'});
  
  user['active'] = false;
  user.save({ validateBeforeSave: false });

  return res.status(200).json({ message: 'Operation successfully completed.'});

};

const findUserById = async(req, res) => {

  const user = await User.findById(req['params']['id']);
  
  if (!user) return res.status(400).json({ message: 'User not found.'});

  return res.status(200).json(user);

};

const findMyProfile = async(req, res) => {

  const user = await User.findById(req['user']['_id']);
  
  if (!user) return res.status(400).json({ message: 'User not found.'});

  return res.status(200).json(user);

};

module.exports = {
  getAllActiveUsers,
  disableUser,
  findUserById,
  findMyProfile
};
