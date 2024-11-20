const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  passwordConfirm: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: [ 'user', 'admin' ],
    default: 'user'
  },
  creationDate: {
    type: Date
  },
  active: {
    type: Boolean,
    default: true
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
