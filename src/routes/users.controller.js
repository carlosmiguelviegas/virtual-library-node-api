const User = require('./../models/user.model');

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
    return res.status(201).json(savedUser);
  } catch(error) {
    return res.status(400).json(error);
  }

};

module.exports = {
  signup
};
