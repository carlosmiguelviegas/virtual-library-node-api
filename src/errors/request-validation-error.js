const { CustomError } = require('./custom-error');

class RequestValidationError extends CustomError {

  statusCode = 400;
  errorsList;

  constructor(errors) {
    super('Invalid request parameters');
    this.errorsList = errors;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  processErrors() {
    return this.errorsList;
  }; 

};

module.exports = { RequestValidationError };
