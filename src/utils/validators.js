const { body } = require('express-validator');

const { FIELD_REQUIRED, FIELD_INVALID_LENGTH, INVALID_EMAIL_ADDRESS, PASSWORDS_NOT_MATCHING } = require('./errors-messages');

const inputValidator = field => body(`${field}`)
  .notEmpty().withMessage(FIELD_REQUIRED(field))
  .isLength({ min: 3 }).withMessage(FIELD_INVALID_LENGTH(field));

const emailValidator = () => body('email')
  .notEmpty().withMessage(FIELD_REQUIRED('email address'))
  .isEmail().withMessage(INVALID_EMAIL_ADDRESS);

const passwordsMatchValidator = () => body('passwordConfirm')
  .custom((value, { req }) => {
    if (value !== req.body.password) throw new Error(PASSWORDS_NOT_MATCHING);
    return true;
  }
);



module.exports = {
  inputValidator,
  emailValidator,
  passwordsMatchValidator,
};
