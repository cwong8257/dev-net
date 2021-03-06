const Validator = require('validator');

const isEmpty = require('./isEmpty');

module.exports = (data) => {
  const errors = {};
  const requiredFields = ['email', 'password'];

  requiredFields.forEach((field) => {
    data[field] = isEmpty(data[field]) ? '' : data[field];
  });

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  requiredFields.forEach((field) => {
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
