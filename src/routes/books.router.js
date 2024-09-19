const express = require('express');

const { loggedInGuard, restrictTo } = require('./../controllers/auth.controller');
const { getAllBooks, createNewBook } = require('./../controllers/books.controller');

const booksRouter = express.Router();

booksRouter.get('/', loggedInGuard, getAllBooks);

booksRouter.post('/', loggedInGuard, restrictTo('admin'), createNewBook);

module.exports = booksRouter;
