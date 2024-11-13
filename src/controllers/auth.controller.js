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

  return res.status(200).setHeader('token', token).setHeader('Access-Control-Expose-Headers', [ 'token' ]).json(user);

};

module.exports = {
  signup,
  login
};
