const Validator = require('validator');

const isEmpty = require('./isEmpty');

module.exports = (data) => {
  const errors = {};
  const requiredFields = ['text'];

  requiredFields.forEach((field) => {
    data[field] = isEmpty(data[field]) ? '' : data[field];
  });

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 10 and 300 characters';
  }

  requiredFields.forEach((field) => {
    if (isEmpty(data[field])) {
      errors[field] = `${field[0].toUpperCase() + field.substring(1)} field is required`;
    }
  });

  const isValid = isEmpty(errors);

  return {
    errors,
    isValid,
  };
};
