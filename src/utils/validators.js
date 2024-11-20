const { body } = require('express-validator');

const { EMAIL_ADDRESS_REQUIRED, INVALID_EMAIL_ADDRESS, PASSWORD_REQUIRED, PASSWORD_INVALID_LENGTH } = require('./errors-messages');

const emailValidator = () => body('email')
  .notEmpty().withMessage(EMAIL_ADDRESS_REQUIRED)
  .isEmail().withMessage(INVALID_EMAIL_ADDRESS);

const passwordValidator = () => body('password')
  .notEmpty().withMessage(PASSWORD_REQUIRED)
  .isLength({ min: 3 }).withMessage(PASSWORD_INVALID_LENGTH);

module.exports = {
  emailValidator,
  passwordValidator
};
