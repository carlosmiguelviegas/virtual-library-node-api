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

  const { title, category, quantity } = req.body;
  
  const newBook = {
    title,
    category,
    quantity
  };

  try {
    const savedBook = await Book.create(newBook);
    return res.status(201).json(savedBook);
  } catch(error) {
    return res.status(400).json(error['message']);
  }

};

module.exports = {
  getAllBooks,
  createNewBook
};
