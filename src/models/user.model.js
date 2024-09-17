const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The name is mandatory']
  },
  email: {
    type: String,
    required: [true, 'The email is mandatory'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is mandatory'],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm the password'],
    minlength: 8
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
