const express = require('express');
const usersRouter = require('./users.router');
const booksRouter = require('./books.router');

const apiRouter = express.Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/books', booksRouter);

module.exports = apiRouter;
