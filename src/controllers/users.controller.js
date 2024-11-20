const User = require('../models/user.model');
const Lending = require('../models/lending.model');
const { getPagination } = require('../utils/query');

const getAllActiveUsers = async(req, res) => {

  const { skip, limit } = getPagination(req['query']);

  try {
    const usersList = await User.find({ active: true }).select('-password').skip(skip).limit(limit);
    return res.status(200).json(usersList);
  } catch(error) {
    return res.status(400).json(error['message']);
  }

};

const disableUser = async(req, res) => {

  const userId = req['user']['_id'].toString();
  if (req['params']['id'] === userId) return res.status(400).json({ message: 'User cannot disable himself.'});

  const user = await getUserById(req, res);
  if (!user['active']) return res.status(400).json({ message: 'Operation not possible, because the User is already disabled.'});

  const userOpenLendings = await Lending.find({ user: userId, state: 'open' });
  if (userOpenLendings.length) return res.status(400).json({ message: 'User has rented books, so it was impossible to disable him/her.' });

  user['active'] = false;
  user.save({ validateBeforeSave: false });

  return res.status(200).json({ message: 'Operation successfully completed.'});

};

const getUserById = async(req, res) => {

  const user = await User.findById(req['params']['id']);
  
  if (!user) return res.status(400).json({ message: 'User not found.'});

  return user;

};

const findUserById = async(req, res) => {

  const user = await User.findById(req['params']['id']);
  
  if (!user) return res.status(400).json({ message: 'User not found.'});

  return res.status(200).json(user);

};

const currentUserProfile = async(req, res) => {

  const user = await User.findById(req['user']['_id']);
  
  if (!user) return res.status(400).json({ message: 'User not found.'});

  return res.status(200).json(user);

};

const filterObject = (obj, ...fields) => {

  const newObj = {};

  Object.keys(obj).forEach(
    el => {
      if (fields.includes(el)) newObj[el] = obj[el]; 
    }
  );

  return newObj;

};

const updateUserProfile = async(req, res) => {

  if (req['body']['password'] || req['body']['passwordConfirm']) return res.status(400).json({ message: 'This route is not for password updates.'});  

  const filteredObj = filterObject(req['body'], 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(req['params']['id'], filteredObj, { new: true, runValidators: true });

  return res.status(200).json(updatedUser);

};

module.exports = {
  getAllActiveUsers,
  disableUser,
  findUserById,
  currentUserProfile,
  updateUserProfile
};
