const INVALID_EMAIL_ADDRESS = 'Please provide a valid email address.';
const FIELD_REQUIRED = field => `The ${field} is mandatory.`;
const FIELD_INVALID_LENGTH = (field, min) => `The ${field} must be at least ${min} characters long.`;
const PASSWORDS_NOT_MATCHING= 'The passwords have to match.';
const QUANTITY_NEGATIVE_NOT_ALLOWED = field => `The ${field} cannot be negative.`;

module.exports = {
  INVALID_EMAIL_ADDRESS,
  FIELD_REQUIRED,
  FIELD_INVALID_LENGTH,
  PASSWORDS_NOT_MATCHING,
  QUANTITY_NEGATIVE_NOT_ALLOWED
};
