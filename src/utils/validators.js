const { body } = require('express-validator');

const User = require('./../models/user.model');

const { FIELD_REQUIRED, FIELD_INVALID_LENGTH, INVALID_EMAIL_ADDRESS, EMAIL_IN_USE, PASSWORDS_NOT_MATCHING, QUANTITY_NEGATIVE_NOT_ALLOWED, ROUTE_NOT_FOR_PASSWORD_UPDATES, YEAR_ZERO_OR_NEGATIVE_NOT_ALLOWED, MINIMUM_YEAR_NOT_ALLOWED } = require('./messages');
const { BadRequestError } = require('../errors/bad-request-error');

const inputValidator = (field, min = 3) => body(`${field}`)
  .notEmpty().withMessage(FIELD_REQUIRED(field))
  .isLength({ min: min }).withMessage(FIELD_INVALID_LENGTH(field, min));

const emailValidator = () => body('email')
  .notEmpty().withMessage(FIELD_REQUIRED('email address'))
  .isEmail().withMessage(INVALID_EMAIL_ADDRESS);

const emailInUseValidator = () => body('email')
  .custom(async (value) => {
    const existingUser = await User.findOne({ email: value });
    if (existingUser) throw new BadRequestError(EMAIL_IN_USE);
    return true;
  }
);

const passwordsMatchValidator = () => body('passwordConfirm')
  .custom((value, { req }) => {
    if (value !== req.body.password) throw new BadRequestError(PASSWORDS_NOT_MATCHING);
    return true;
  }
);

const zeroOrPositiveValidator = field => body(`${field}`)
  .notEmpty().withMessage(FIELD_REQUIRED(field))
  .custom(value => {
    if (value < 0) throw new BadRequestError(QUANTITY_NEGATIVE_NOT_ALLOWED(field));
    return true;
  }
);

const notAllowUpdatePasswordValidator = field => body(`${field}`)
  .custom(value => {
    if (value) throw new BadRequestError(ROUTE_NOT_FOR_PASSWORD_UPDATES);
    return true;
  }
);

const yearValidator = () => body('yearOfPublication')
  .notEmpty().withMessage(FIELD_REQUIRED(field))
  .custom(value => {
    if (value <= 0) throw new BadRequestError(YEAR_ZERO_OR_NEGATIVE_NOT_ALLOWED);
    if (value < 1900) throw new BadRequestError(MINIMUM_YEAR_NOT_ALLOWED);
    return true;
  }
);

module.exports = {
  inputValidator,
  emailValidator,
  emailInUseValidator,
  passwordsMatchValidator,
  zeroOrPositiveValidator,
  notAllowUpdatePasswordValidator,
  yearValidator
};
