const jwt = require('jsonwebtoken');

const { BadRequestError } = require('./../errors/bad-request-error');
const User = require('../models/user.model');
const { INCORRECT_CREDENTIALS } = require('../utils/messages');

const createToken = id => {
  
  const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  
};

const signup = async(req, res) => {

  const { name, email, password, passwordConfirm } = req.body;
  
  const newUser = {
    name,
    email,
    password,
    passwordConfirm,
    creationDate: Date.now()
  };

    const savedUser = await User.create(newUser);
    const token = createToken(savedUser['_id']);
    return res.status(201).setHeader('token', token).json(savedUser);

};

const login = async(req, res, next) => {
  
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.correctPassword(password, user['password']))) {
    return next(new BadRequestError(INCORRECT_CREDENTIALS));
  }

  const token = createToken(user['_id']);

  return res.status(200).setHeader('token', token).setHeader('Access-Control-Expose-Headers', [ 'token' ]).json(user);

};

module.exports = {
  signup,
  login
};
