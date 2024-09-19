const mongoose = require('mongoose');
const validator = require('validator');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The title is mandatory']
  },
  category: {
    type: String,
    enum: [ 'IT', 'SC', 'MT', 'CR', 'RO' ],
    required: [true, 'The category is mandatory']
  },
  quantity: {
    type: Number,
    required: [true, 'The quantity is mandatory'],
    min: 1
  },
  availability: {
    type: Boolean,
    default: true
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
