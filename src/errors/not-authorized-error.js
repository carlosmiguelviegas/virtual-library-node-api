const { CustomError } = require('./custom-error');

class NotAuthorizedError extends CustomError {

  statusCode = 401;

  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  processErrors() {
    return [{ message: this.message }];
  }; 

};

module.exports = { NotAuthorizedError };