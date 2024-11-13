const { promisify } = require('util');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const loggedInGuard = async(req, res, next) => {

  // Check if there´s authorization header and token
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Please log in to get access.' });
  }

  // Verification token
  const verified = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user still exists
  const user = await User.findById(verified['id']);

  if (!user) {
    return res.status(401).json({ message: 'The user with the given token no longer exists.' });
  }

  // Grant access to protected route
  req['user'] = user;
  next();

};

module.exports = { loggedInGuard };
