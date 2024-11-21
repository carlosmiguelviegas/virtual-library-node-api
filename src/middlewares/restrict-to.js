const { ForbiddenError } = require('./../errors/forbidden-error');
const { OPERATION_NOT_ALLOWED } = require('./../utils/messages');

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req['user']['role'])) {
      return next(ForbiddenError(OPERATION_NOT_ALLOWED));
    }
    next();
  };
};

module.exports = { restrictTo };
