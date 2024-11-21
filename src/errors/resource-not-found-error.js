const { CustomError } = require('./custom-error');

class ResourceNotFoundError extends CustomError {

  statusCode = 404;

  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
  }

  processErrors() {
    return [{ message: this.message }];
  }; 

};

module.exports = { ResourceNotFoundError };
