const INVALID_EMAIL_ADDRESS = 'Please provide a valid email address.';
const EMAIL_IN_USE = 'Email address already in use.';
const FIELD_REQUIRED = field => `The ${field} is mandatory.`;
const FIELD_INVALID_LENGTH = (field, min) => `The ${field} must be at least ${min} characters long.`;
const PASSWORDS_NOT_MATCHING= 'The passwords have to match.';
const QUANTITY_NEGATIVE_NOT_ALLOWED = field => `The ${field} cannot be negative.`;
const INCORRECT_CREDENTIALS = 'Incorrect email or password.';
const NOT_POSSIBLE_DELETE_BOOK = 'Operation not possible as the book is not available.';
const OPERATION_SUCCESSFULLY_COMPLETED = 'Operation successfully completed.';
const NOT_POSSIBLE_RENT_SAME_BOOK = 'Book already rented by the User.';
const NOT_FOUND_ERROR = field => `${field} not found with that id.`;
const UNAVAILABLE_BOOK = 'It was not possible to lend the book as it is not available.';
const NOT_POSSIBLE_RETURN_BOOK = 'It was not possible to return the book as the user has not rented the book.';
const USER_NOT_LOGGED_IN = 'Please log in to get access.';
const USER_NO_LONGER_EXISTS = 'The user with the given token no longer exists.';
const OPERATION_NOT_ALLOWED = 'Not allowed to perform this operation.';
const NOT_POSSIBLE_DISABLE_ONESELF = 'User cannot disable himself.';
const NOT_POSSIBLE_ENAABLE_ONESELF = 'User cannot enable himself.';
const DISABLED_USER_ERROR = 'Operation not possible, because the user is already disabled.';
const DISABLED_USER_ERROR_RENTED_BOOKS = 'User has rented books, so it was impossible to disable him/her.';
const ROUTE_NOT_FOR_PASSWORD_UPDATES = 'This route is not for password updates.';

module.exports = {
  INVALID_EMAIL_ADDRESS,
  EMAIL_IN_USE,
  FIELD_REQUIRED,
  FIELD_INVALID_LENGTH,
  PASSWORDS_NOT_MATCHING,
  QUANTITY_NEGATIVE_NOT_ALLOWED,
  INCORRECT_CREDENTIALS,
  NOT_POSSIBLE_DELETE_BOOK,
  OPERATION_SUCCESSFULLY_COMPLETED,
  NOT_POSSIBLE_RENT_SAME_BOOK,
  NOT_FOUND_ERROR,
  UNAVAILABLE_BOOK,
  NOT_POSSIBLE_RETURN_BOOK,
  USER_NOT_LOGGED_IN,
  USER_NO_LONGER_EXISTS,
  OPERATION_NOT_ALLOWED,
  NOT_POSSIBLE_DISABLE_ONESELF,
  NOT_POSSIBLE_ENAABLE_ONESELF,
  DISABLED_USER_ERROR,
  DISABLED_USER_ERROR_RENTED_BOOKS,
  ROUTE_NOT_FOR_PASSWORD_UPDATES
};
