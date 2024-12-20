const { CustomError } = require('./custom-error');

class BadRequestError extends CustomError {

  statusCode = 400;

  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  processErrors() {
    return [{ message: this.message }];
  }; 

};

module.exports = { BadRequestError };
