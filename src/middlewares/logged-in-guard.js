const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const { USER_NOT_LOGGED_IN, USER_NO_LONGER_EXISTS } = require('../utils/messages');
const { NotAuthorizedError } = require('./../errors/not-authorized-error');
const { ResourceNotFoundError } = require('./../errors/resource-not-found-error');

const loggedInGuard = async(req, res, next) => {

  // Check if there´s authorization header and token
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new NotAuthorizedError(USER_NOT_LOGGED_IN));
  }

  // Verification token
  const verified = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user still exists
  const user = await User.findById(verified['id']);

  if (!user) {
    return next(new ResourceNotFoundError(USER_NO_LONGER_EXISTS));
  }

  // Grant access to protected route
  req['user'] = user;
  next();

};

module.exports = { loggedInGuard };
