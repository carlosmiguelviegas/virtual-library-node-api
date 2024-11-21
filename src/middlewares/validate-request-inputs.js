const { validationResult } = require('express-validator');

const { RequestValidationError } = require('../errors/request-validation-error');

const validateRequestInputs = (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsList = errors.array().map(err => {
      if ('field' === err['type']) return { message: err['msg'], field: err['path'] };
      return { message: err['msg'] };
    });
    return next(new RequestValidationError(errorsList));
  }

  next();

};

module.exports = { validateRequestInputs };
