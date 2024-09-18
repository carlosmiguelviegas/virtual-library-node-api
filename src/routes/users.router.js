const express = require('express');

const { signup, login, loggedInGuard, restrictTo } = require('./../controllers/auth.controller');
const { getAllActiveUsers } = require('./../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.post('/signup', signup);

usersRouter.post('/login', login);

usersRouter.route('/').get(loggedInGuard, restrictTo('admin'), getAllActiveUsers);

module.exports = usersRouter;
