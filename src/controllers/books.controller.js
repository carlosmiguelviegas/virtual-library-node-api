const Book = require('../models/book.model');

const getAllBooks = async(req, res) => {

  try {
    const booksList = await Book.find({});
    return res.status(200).json(booksList);
  } catch(error) {
    return res.status(400).json(error['message']);
  }

};

const createNewBook = async(req, res) => {

};

module.exports = {
  getAllBooks,
  createNewBook
};
