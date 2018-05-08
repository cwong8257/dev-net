import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({
  name, value, error, onChange, info, options, label, optional,
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name}>
          {label} {optional && <span className="text-muted">(optional)</span>}
        </label>
      )}
      <select
        id={name}
        className={classnames('form-control', {
          'is-invalid': error,
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  optional: PropTypes.bool,
};

SelectListGroup.defaultProps = {
  value: null,
  error: null,
  info: null,
  label: null,
  optional: false,
};

export default SelectListGroup;
