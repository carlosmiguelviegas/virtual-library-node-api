const express = require('express');

const { loggedInGuard, restrictTo } = require('./../controllers/auth.controller');
const { getAllBooks, createNewBook, deleteBook } = require('./../controllers/books.controller');

const booksRouter = express.Router();

booksRouter.get('/', loggedInGuard, getAllBooks);

booksRouter.post('/', loggedInGuard, restrictTo('admin'), createNewBook);

booksRouter.delete('/:id', loggedInGuard, restrictTo('admin'), deleteBook);

module.exports = booksRouter;
