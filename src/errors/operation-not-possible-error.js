const { CustomError } = require('./custom-error');

class OperationNotPossibleError extends CustomError {

  statusCode = 400;

  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, OperationNotPossibleError.prototype);
  }

  processErrors() {
    return [{ message: this.message }];
  }; 

};

module.exports = { OperationNotPossibleError };
