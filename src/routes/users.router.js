const express = require('express');

const { signup, login } = require('./../controllers/auth.controller');
const { loggedInGuard } = require('./../middlewares/logged-in-guard');
const { restrictTo } = require('./../middlewares/restrict-to');
const { validateRequestInputs } = require('./../middlewares/validate-request-inputs');
const { inputValidator, emailValidator, passwordsMatchValidator } = require('../utils/validators');
const { getAllActiveUsers, disableUser, findUserById, currentUserProfile, updateUserProfile } = require('./../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.post('/signup',
  [
    inputValidator('name'),
    emailValidator(),
    inputValidator('password'),
    passwordsMatchValidator()
  ],
  validateRequestInputs,
  signup
);

usersRouter.post('/login',
  [
    emailValidator(),
    inputValidator('password')
  ],
  validateRequestInputs,
  login
);

usersRouter.get('/current-user-profile', loggedInGuard, currentUserProfile);

usersRouter.patch('/:id', loggedInGuard, updateUserProfile);

usersRouter.get('/', loggedInGuard, restrictTo('admin'), getAllActiveUsers);

usersRouter.patch('/disable/:id', loggedInGuard, restrictTo('admin'), disableUser);

usersRouter.get('/:id', loggedInGuard, restrictTo('admin'), findUserById);

module.exports = usersRouter;
