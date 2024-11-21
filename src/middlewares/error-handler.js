const { CustomError } = require("./../errors/custom-error");

const errorHandler = (err, req, res, next) => {

  if (err instanceof CustomError) {
    return res.status(err['statusCode']).json({ errors: err.processErrors() });
  }

  res.status(400).json({ errors: [{ message: 'Something went wrong.' }] });

};

module.exports = { errorHandler };
