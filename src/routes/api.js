const express = require('express');

const usersRouter = require('./users.router');
const booksRouter = require('./books.router');
const { errorHandler } = require('./../middlewares/error-handler');

const apiRouter = express.Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/books', booksRouter);
apiRouter.use(errorHandler);

module.exports = apiRouter;
