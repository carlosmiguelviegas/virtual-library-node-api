const mongoose = require('mongoose');

const lendingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book',
    required: true
  },
  lendingDate: {
    type: Date,
    required: true
  },
  returnDate: Date,
  state: {
    type: String,
    enum: [ 'open', 'closed' ],
    default: 'open'
  }
});

const Lending = mongoose.model('Lending', lendingSchema);

module.exports = Lending;
