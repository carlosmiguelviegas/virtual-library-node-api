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

const deleteBook = async(req, res) => {

  try {
    await Book.findByIdAndDelete(req['params']['id']);
    return res.status(204).json({ message: 'Operation successfully completed.' });
  } catch(error) {
    return res.status(400).json(error['message']);
  }

};

module.exports = {
  getAllBooks,
  createNewBook,
  deleteBook
};
