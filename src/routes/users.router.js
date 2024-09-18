const express = require('express');

const { signup, login, loggedInGuard, restrictTo } = require('./../controllers/auth.controller');

const usersRouter = express.Router();

usersRouter.post('/signup', signup);

usersRouter.post('/login', login);

usersRouter.route('/').get(loggedInGuard, restrictTo, signup);

module.exports = usersRouter;
