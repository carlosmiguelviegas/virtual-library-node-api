const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    minlength: 3
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm the password'],
    minlength: 3,
    validate: {
      // This only works on CREATE and SAVE!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same'
    }
  }
});

userSchema.pre('save', async function(next) {
  // Only encrypts the password if this was changed
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);

  // assingning a field as undefined will cause the field not to be persisted in db
  this.passwordConfirm = undefined;
  next();

});

userSchema.methods.correctPassword = async (loginPassword, userPassword) => await bcrypt.compare(loginPassword, userPassword);

const User = mongoose.model('User', userSchema);

module.exports = User;
