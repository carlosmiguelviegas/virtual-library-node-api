const express = require('express');

const { signup, login } = require('./../controllers/auth.controller');
const { loggedInGuard } = require('./../middlewares/logged-in-guard');
const { restrictTo } = require('./../middlewares/restrict-to');
const { validateRequestInputs } = require('./../middlewares/validate-request-inputs');
const { inputValidator, emailValidator, emailInUseValidator, notAllowUpdatePasswordValidator, passwordsMatchValidator } = require('../utils/validators');
const { getAllActiveUsers, disableUser, enableUser, findUserById, currentUserProfile, updateUserProfile } = require('./../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.post('/signup',
  [
    inputValidator('name'),
    emailValidator(),
    emailInUseValidator(),
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

usersRouter.get('/current-user-profile',
  [
    notAllowUpdatePasswordValidator('password'),
    notAllowUpdatePasswordValidator('passwordConfirm')
  ],
  validateRequestInputs,
  loggedInGuard, currentUserProfile
);

usersRouter.patch('/:id', loggedInGuard, updateUserProfile);

usersRouter.get('/', loggedInGuard, restrictTo('admin'), getAllActiveUsers);

usersRouter.patch('/disable/:id', loggedInGuard, restrictTo('admin'), disableUser);

usersRouter.patch('/enable/:id', loggedInGuard, restrictTo('admin'), enableUser);

usersRouter.get('/:id', loggedInGuard, restrictTo('admin'), findUserById);

module.exports = usersRouter;
