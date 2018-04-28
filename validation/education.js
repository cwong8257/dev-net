const isEmpty = require('./isEmpty');

module.exports = (data) => {
  const errors = {};
  const requiredFields = ['school', 'degree', 'from', 'fieldOfStudy'];

  requiredFields.forEach((field) => {
    data.text = !isEmpty(data.text) ? data.text : '';
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
