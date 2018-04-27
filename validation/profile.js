const Validator = require('validator');

const isEmpty = require('./isEmpty');

module.exports = (data) => {
  const errors = {};
  const requiredFields = ['handle', 'status', 'skills'];
  const siteUrls = ['website', 'youtube', 'twitter', 'facebook', 'linkedin', 'instagram'];

  requiredFields.forEach((field) => {
    data[field] = !isEmpty(data[field]) ? data[field] : '';
  });

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to be between 2 and 40 characters';
  }

  if (!isEmpty(data.website)) {
    siteUrls.forEach((url) => {
      if (!isEmpty(data[url])) {
        if (!Validator.isURL(data[url])) {
          errors[url] = `Not a valid ${url} URL`;
        }
      }
    });
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
