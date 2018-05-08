import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  onChange,
  info,
  label,
  optional,
}) => (
  <div className="form-group">
    {label && (
      <label htmlFor={name}>
        {label} {optional && <span className="text-muted">(optional)</span>}
      </label>
    )}
    <textarea
      id={name}
      className={classnames('form-control', {
        'is-invalid': error,
      })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
    />
    {info && <small className="form-text text-muted">{info}</small>}
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string,
  label: PropTypes.string,
  optional: PropTypes.bool,
};

TextAreaFieldGroup.defaultProps = {
  placeholder: null,
  value: null,
  error: null,
  info: null,
  label: null,
  optional: false,
};

export default TextAreaFieldGroup;
