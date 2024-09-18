const { promisify } = require('util')
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const createToken = id => {
  
  const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  
};

const signup = async(req, res) => {
  
  const { name, email, password, passwordConfirm, role } = req.body;
  
  const newUser = {
    name,
    email,
    password,
    passwordConfirm,
    role,
    creationDate: Date.now()
  };

  try {
    const savedUser = await User.create(newUser);
    const token = createToken(savedUser['_id']);
    return res.status(201).setHeader('token', token).json(savedUser);
  } catch(error) {
    return res.status(400).json(error['message']);
  }

};

const login = async(req, res) => {
  
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email or password not valid' });
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.correctPassword(password, user['password']))) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  const token = createToken(user['_id']);

  return res.status(200).setHeader('token', token).json(user);

};

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
  req.user = user;
  next();

};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin'] role='user'
    if (!roles.includes(req['user']['role'])) {
      return res.status(403).json({ message: 'You are not allowed to perform this operation.' });
    }
    next();
  };
};

module.exports = {
  signup,
  login,
  loggedInGuard,
  restrictTo
};
