const express = require('express');

const { loggedInGuard } = require('./../middlewares/logged-in-guard');
const { restrictTo } = require('./../middlewares/restrict-to');
const { validateRequestInputs } = require('./../middlewares/validate-request-inputs');
const { inputValidator, zeroOrPositiveValidator } = require('../utils/validators');
const { getAllBooks, createNewBook, deleteBook, rentBook, returnBook } = require('./../controllers/books.controller');

const booksRouter = express.Router();

booksRouter.get('/', loggedInGuard, getAllBooks);

booksRouter.post('/',
  [
    inputValidator('title', 2),
    inputValidator('category', 2),
    zeroOrPositiveValidator('quantity')
  ],
  validateRequestInputs,    
  loggedInGuard, restrictTo('admin'), createNewBook);

booksRouter.delete('/:id', loggedInGuard, restrictTo('admin'), deleteBook);

booksRouter.patch('/rent/:id', loggedInGuard, rentBook);

booksRouter.patch('/return/:id', loggedInGuard, returnBook);

module.exports = booksRouter;
