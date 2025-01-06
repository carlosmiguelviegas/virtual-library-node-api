const User = require('../models/user.model');
const Lending = require('../models/lending.model');
const { getPagination } = require('../utils/query');
const { OperationNotPossibleError } = require('./../errors/operation-not-possible-error');
const { NOT_POSSIBLE_DISABLE_ONESELF, DISABLED_USER_ERROR, DISABLED_USER_ERROR_RENTED_BOOKS, OPERATION_SUCCESSFULLY_COMPLETED, NOT_FOUND_ERROR, NOT_POSSIBLE_ENABLE_ONESELF, ENABLED_USER_ERROR } = require('./../utils/messages');
const { ResourceNotFoundError } = require('../errors/resource-not-found-error');

const getAllActiveUsers = async(req, res) => {

  const { skip, limit } = getPagination(req['query']);

  try {
    const usersList = await User.find({ active: true }).select('-password').skip(skip).limit(limit);
    const total = await User.countDocuments({ active: true });
    return res.status(200).json({ usersList, total });
  } catch(error) {
    return res.status(400).json(error['message']);
  }

};

const getAllInactiveUsers = async(req, res) => {

  // it was intentional

};

const disableUser = async(req, res, next) => {

  const userId = req['user']['_id'].toString();
  if (req['params']['id'] === userId) return next(new OperationNotPossibleError(NOT_POSSIBLE_DISABLE_ONESELF));

  const user = await getUserById(req, res);
  if (!user['active']) return next(new OperationNotPossibleError(DISABLED_USER_ERROR));

  const userOpenLendings = await Lending.find({ user: userId, state: 'open' });
  if (userOpenLendings.length) return next(new OperationNotPossibleError(DISABLED_USER_ERROR_RENTED_BOOKS));

  user['active'] = false;
  user.save({ validateBeforeSave: false });

  return res.status(200).json({ message: OPERATION_SUCCESSFULLY_COMPLETED});

};

const getUserById = async(req, res, next) => {

  const user = await User.findById(req['params']['id']);
  
  if (!user) return next(new ResourceNotFoundError(NOT_FOUND_ERROR('User')));

  return user;

};

const enableUser = async(req, res, next) => {

  const userId = req['user']['_id'].toString();
  if (req['params']['id'] === userId) return next(new OperationNotPossibleError(NOT_POSSIBLE_ENABLE_ONESELF));

  const user = await getUserById(req, res);
  if (user['active']) return next(new OperationNotPossibleError(ENABLED_USER_ERROR));

  user['active'] = true;
  user.save({ validateBeforeSave: false });

  return res.status(200).json({ message: OPERATION_SUCCESSFULLY_COMPLETED});

};

const findUserById = async(req, res, next) => {

  const user = await User.findById(req['params']['id']);
  
  if (!user) return next(new ResourceNotFoundError(NOT_FOUND_ERROR('User')));

  return res.status(200).json(user);

};

const currentUserProfile = async(req, res, next) => {

  const user = await User.findById(req['user']['_id']);
  
  if (!user) return next(new ResourceNotFoundError(NOT_FOUND_ERROR('User')));

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

  const filteredObj = filterObject(req['body'], 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(req['params']['id'], filteredObj, { new: true, runValidators: true });

  return res.status(200).json(updatedUser);

};

module.exports = {
  getAllActiveUsers,
  getAllInactiveUsers,
  disableUser,
  enableUser,
  findUserById,
  currentUserProfile,
  updateUserProfile
};
