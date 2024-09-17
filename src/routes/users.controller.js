const User = require('./../models/user.model');
const jwt = require('jsonwebtoken');

const signup = async(req, res) => {
  
  const { name, email, password, passwordConfirm } = req.body;
  
  const newUser = {
    name,
    email,
    password,
    passwordConfirm
  };

  try {
    const savedUser = await User.create(newUser);
    const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
    const token = jwt.sign({ id: savedUser['_id'] }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.status(201).setHeader('token', token).json(savedUser);
  } catch(error) {
    return res.status(400).json(error['message']);
  }

};

module.exports = {
  signup
};
