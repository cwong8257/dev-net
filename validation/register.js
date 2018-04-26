const Validator = require('validator');

const isEmpty = require('./isEmpty');

module.exports = (data) => {
  const errors = {};
  const fields = ['name', 'email', 'password', 'confirm'];

  fields.forEach((field) => {
    data[field] = !isEmpty(data[field]) ? data[field] : '';
  });

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!Validator.equals(data.password, data.confirm)) {
    errors.confirm = 'Passwords must match';
  }

  fields.forEach((field) => {
    if (Validator.isEmpty(data[field])) {
      errors[field] = `${field[0].toUpperCase() + field.substring(1)} field is required`;
    }
  });

  const isValid = isEmpty(errors);

  return {
    errors,
    isValid,
  };
};
