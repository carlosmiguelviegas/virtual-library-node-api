const express = require('express');

const usersRouter = require('./users.router');

const apiRouter = express.Router();

apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
