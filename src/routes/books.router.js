const express = require('express');

const { loggedInGuard } = require('./../controllers/auth.controller');
const { getAllBooks } = require('./../controllers/books.controller');

const booksRouter = express.Router();

booksRouter.get('/', loggedInGuard, getAllBooks);

module.exports = booksRouter;
