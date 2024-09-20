const express = require('express');

const { loggedInGuard, restrictTo } = require('./../controllers/auth.controller');
const { getAllBooks, createNewBook, deleteBook, rentBook } = require('./../controllers/books.controller');

const booksRouter = express.Router();

booksRouter.get('/', loggedInGuard, getAllBooks);

booksRouter.post('/', loggedInGuard, restrictTo('admin'), createNewBook);

booksRouter.delete('/:id', loggedInGuard, restrictTo('admin'), deleteBook);

booksRouter.patch('/:id', loggedInGuard, rentBook);

module.exports = booksRouter;
