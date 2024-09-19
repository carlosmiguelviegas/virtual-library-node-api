const express = require('express');

const { signup, login, loggedInGuard, restrictTo } = require('./../controllers/auth.controller');
const { getAllActiveUsers, disableUser, findUserById, findMyProfile } = require('./../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.post('/signup', signup);

usersRouter.post('/login', login);

usersRouter.get('/my-profile', loggedInGuard, findMyProfile);

usersRouter.get('/', loggedInGuard, restrictTo('admin'), getAllActiveUsers);

usersRouter.patch('/disable/:id', loggedInGuard, restrictTo('admin'), disableUser);

usersRouter.get('/:id', loggedInGuard, restrictTo('admin'), findUserById);

module.exports = usersRouter;
