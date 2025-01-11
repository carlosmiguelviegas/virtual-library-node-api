const Book = require('../models/book.model');
const Lending = require('../models/lending.model');
const { NOT_POSSIBLE_DELETE_BOOK, OPERATION_SUCCESSFULLY_COMPLETED, NOT_POSSIBLE_RENT_SAME_BOOK, NOT_FOUND_ERROR, UNAVAILABLE_BOOK, NOT_POSSIBLE_RETURN_BOOK } = require('../utils/messages');
const { getPagination } = require('../utils/query');
const { OperationNotPossibleError } = require('./../errors/operation-not-possible-error');
const { ResourceNotFoundError } = require('./../errors/resource-not-found-error');

const getAllBooks = async(req, res) => {

  const { skip, limit } = getPagination(req['query']);
  
  const booksList = await Book.find({}).skip(skip).limit(limit);
  const total = await Book.countDocuments();
  return res.status(200).json({ booksList, total });

};

const previewBooksByCategory = async(req, res) => {

  const previewBooksList = await Book.find({ category: req['query']['category'] }).limit(4);
  return res.status(200).json(previewBooksList);

};

const getBooksByCategory = async(req, res) => {

  const { skip, limit, category } = getPagination(req['query']);
  
  const booksList = await Book.find({ category }).skip(skip).limit(limit);
  const total = await Book.countDocuments({ category });
  return res.status(200).json({ booksList, total });

};

const createNewBook = async(req, res) => {

  const { title, category, quantity } = req['body'];
  
  const newBook = {
    title,
    category,
    quantity
  };

  const savedBook = await Book.create(newBook);
  return res.status(201).json(savedBook);

};

const deleteBook = async(req, res, next) => {

  const bookId = req['params']['id'];

  const bookOpenLendings = await Lending.find({ book: bookId, state: 'open' });

  if (bookOpenLendings.length) return next(new OperationNotPossibleError(NOT_POSSIBLE_DELETE_BOOK));

  await Book.findByIdAndDelete(bookId);
  return res.status(204).json({ message: OPERATION_SUCCESSFULLY_COMPLETED });

};

const rentBook = async(req, res, next) => {

  const bookId = req['params']['id'];
  const userId = req['user']['_id'].toString();

  const sameBookAndOpen = await findBookLending(userId, bookId);

  if (sameBookAndOpen) return next(new OperationNotPossibleError(NOT_POSSIBLE_RENT_SAME_BOOK));
  
  const book = await Book.findById(bookId);

  if (!book) return next(new ResourceNotFoundError(NOT_FOUND_ERROR('Book')));

  if (!book['availability']) return next(new OperationNotPossibleError(UNAVAILABLE_BOOK));

  const newLending = {
    user: userId,
    book: bookId,
    lendingDate: Date.now()
  };

  const lending = await Lending.create(newLending);

  if (lending) {
    book['quantity'] = book['quantity'] - 1;
    await book.save();
    return res.status(200).json({ message: OPERATION_SUCCESSFULLY_COMPLETED });
  }

};

const findBookLending = async(userId, bookId) => {
  return await Lending.findOne({ user: userId, book: bookId, state: 'open' });
};

const closeBookLending = async(lending) => {
  lending['state'] = 'closed';
  lending['returnDate'] = Date.now();
  await lending.save();
};

const returnBook = async(req, res, next) => {

  const bookId = req['params']['id'];
  const userId = req['user']['_id'].toString();

  const lending = await findBookLending(userId, bookId);

  if (!lending) return next(new OperationNotPossibleError(NOT_POSSIBLE_RETURN_BOOK));
  
  const book = await Book.findById(bookId);

  await closeBookLending(lending);

  book['quantity'] = book['quantity'] + 1;
  await book.save();
  return res.status(200).json({ message: OPERATION_SUCCESSFULLY_COMPLETED });

};

module.exports = {
  getAllBooks,
  previewBooksByCategory,
  getBooksByCategory,
  createNewBook,
  deleteBook,
  rentBook,
  returnBook
};
