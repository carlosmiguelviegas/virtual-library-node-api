const { CustomError } = require('./custom-error');

class ForbiddenError extends CustomError {

  statusCode = 403;

  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  processErrors() {
    return [{ message: this.message }];
  }; 

};

module.exports = { ForbiddenError };