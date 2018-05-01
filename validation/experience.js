const isEmpty = require('./isEmpty');

module.exports = (data) => {
  const errors = {};
  const requiredFields = ['title', 'company', 'from'];

  requiredFields.forEach((field) => {
    data[field] = isEmpty(data[field]) ? '' : data[field];
  });

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
