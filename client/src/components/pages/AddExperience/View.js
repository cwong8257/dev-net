import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';

const View = ({
  errors,
  company,
  title,
  location,
  from,
  to,
  current,
  description,
  onSubmit,
  onChange,
  onCheck,
  disabled,
}) => (
  <div className="container">
    <div className="row">
      <div className="col-12 col-md-10 col-lg-8 mx-auto">
        <h1 className="text-center mb-5">Add experience</h1>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-12 col-sm-6">
              <TextFieldGroup
                label="Title"
                placeholder="Ex: Manager"
                name="title"
                value={title}
                onChange={onChange}
                error={errors.title}
              />
            </div>
            <div className="col-12 col-sm-6">
              <TextFieldGroup
                label="Company"
                placeholder="Ex: Microsoft"
                name="company"
                value={company}
                onChange={onChange}
                error={errors.company}
              />
            </div>
            <div className="col-12 col-sm-6">
              <TextFieldGroup
                label="From date"
                type="date"
                name="from"
                value={from}
                onChange={onChange}
                error={errors.from}
              />
            </div>
            <div className="col-12 col-sm-6">
              <TextFieldGroup
                label="To date"
                type="date"
                name="to"
                value={to}
                onChange={onChange}
                error={errors.to}
                disabled={disabled}
                optional
              />
            </div>
            <div className="col-12">
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  name="current"
                  className="form-check-input"
                  value={current}
                  checked={current}
                  onChange={onCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current job
                </label>
              </div>
            </div>
            <div className="col-12">
              <TextFieldGroup
                label="Location"
                placeholder="Ex: New York, NY"
                name="location"
                value={location}
                onChange={onChange}
                error={errors.location}
                optional
              />
            </div>
            <div className="col-12">
              <TextAreaFieldGroup
                label="Description"
                name="description"
                value={description}
                onChange={onChange}
                error={errors.description}
                info="Tell us about the position"
                optional
              />
            </div>
          </div>
          <div className="mt-4">
            <Link to="/dashboard" className="btn btn-light mr-2">
              Go Back
            </Link>
            <button className="btn btn-info">Add experience</button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

View.propTypes = {
  errors: PropTypes.object.isRequired,
  company: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  current: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default View;
