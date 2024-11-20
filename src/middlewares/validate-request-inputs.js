const { validationResult } = require('express-validator');

const validateRequestInputs = (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('Errors if:', errors.array());
    throw new Error(errors.array());
  }

  next();

};

module.exports = { validateRequestInputs };
