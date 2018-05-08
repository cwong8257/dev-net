import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  type,
  onChange,
  disabled,
  info,
  optional,
}) => (
  <div className="form-group">
    {label && (
      <label htmlFor={name}>
        {label} {optional && <span className="text-muted">(optional)</span>}
      </label>
    )}
    <input
      id={name}
      type={type}
      className={classnames('form-control', {
        'is-invalid': error,
      })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    {info && <small className="form-text text-muted">{info}</small>}
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  optional: PropTypes.bool,
};

TextFieldGroup.defaultProps = {
  type: 'text',
  placeholder: '',
  value: null,
  error: null,
  info: null,
  disabled: false,
  label: null,
  optional: false,
};

export default TextFieldGroup;
