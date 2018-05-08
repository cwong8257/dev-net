import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
  name, placeholder, value, error, icon, type, onChange,
}) => (
  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text">
        <i className={icon} />
      </span>
    </div>
    <input
      className={classnames('form-control', {
        'is-invalid': error,
      })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.string,
};

InputGroup.defaultProps = {
  type: 'text',
  placeholder: '',
  value: null,
  error: null,
  icon: null,
};

export default InputGroup;
