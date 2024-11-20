const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [ 'IT', 'SC', 'MT', 'CR', 'RO' ],
    required: true
  },
  quantity: {
    type: Number,
    required: true
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
