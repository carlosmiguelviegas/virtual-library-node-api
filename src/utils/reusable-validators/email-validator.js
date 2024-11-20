const { body } = require('express-validator');

const emailValidator = () => body('email')
  .notEmpty().withMessage('The email address is mandatory.')
  .isEmail().withMessage('Please provide a valid email address.');

module.exports = {
  emailValidator
};
