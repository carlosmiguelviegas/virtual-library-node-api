const express = require('express');

const { loggedInGuard, restrictTo } = require('./../controllers/auth.controller');
const { getAllBooks, createNewBook, deleteBook, rentBook, returnBook } = require('./../controllers/books.controller');

const booksRouter = express.Router();

booksRouter.get('/', loggedInGuard, getAllBooks);

booksRouter.post('/', loggedInGuard, restrictTo('admin'), createNewBook);

booksRouter.delete('/:id', loggedInGuard, restrictTo('admin'), deleteBook);

booksRouter.patch('/rent/:id', loggedInGuard, rentBook);

booksRouter.patch('/return/:id', loggedInGuard, returnBook);

module.exports = booksRouter;
