const express = require('express');

const { signup } = require('./users.controller');

const usersRouter = express.Router();

usersRouter.post('/signup', signup);

module.exports = usersRouter;
