const mongoose = require('mongoose');
const validator = require('validator');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The book\'s title is mandatory.'],
    minlength: [2, 'The book\'s title must be at least 2 characters long.'],
    maxlength: [50, 'The password must be at most 50 characters long.']
  },
  category: {
    type: String,
    enum: [ 'IT', 'SC', 'MT', 'CR', 'RO' ],
    required: [true, 'The book\'s category is mandatory.']
  },
  quantity: {
    type: Number,
    required: [true, 'The quantity is mandatory.'],
    validate: {
      validator: function(el) {
        return el >= 0;
      },
      message: 'The number of copies cannot be negative.'
    }
  },
  availability: {
    type: Boolean,
    default: true
  }
});

bookSchema.pre('save', function(next) {

  this.availability = this.quantity > 0 ? true : false;
  next();

});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
