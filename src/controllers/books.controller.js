const Book = require('../models/book.model');
const Lending = require('../models/lending.model');

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

const rentBook = async(req, res) => {

  const bookId = req['params']['id'];
  const userId = req['user']['_id'].toString();

  const sameBookAndOpen = await Lending.findOne({ user: userId, book: bookId, state: 'open' });

  if (sameBookAndOpen) return res.status(400).json({ message: 'Book already rented by the User.' });
  
  const book = await Book.findById(bookId);

  if (!book) return res.status(400).json({ message: 'Book not found with that id.' });

  if (!book['availability']) return res.status(400).json({ message: 'It was not possible to lend the Book as it is not available.' });

  const newLending = {
    user: userId,
    book: bookId,
    lendingDate: Date.now()
  };

  const lending = await Lending.create(newLending);

  if (lending) {
    book['quantity'] = book['quantity'] - 1;
    await book.save();
    return res.status(200).json({ message: 'Operation successfully completed.' });
  }

};

module.exports = {
  getAllBooks,
  createNewBook,
  deleteBook,
  rentBook
};
