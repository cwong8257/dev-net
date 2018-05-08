import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';

const View = ({
  errors,
  school,
  degree,
  fieldOfStudy,
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
        <h1 className="text-center mb-5">Add education</h1>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-12">
              <TextFieldGroup
                label="School"
                placeholder="Ex: Baruch College"
                name="school"
                value={school}
                onChange={onChange}
                error={errors.school}
              />
            </div>
            <div className="col-12 col-sm-6">
              <TextFieldGroup
                label="Degree"
                placeholder="Ex: Bachelor's"
                name="degree"
                value={degree}
                onChange={onChange}
                error={errors.degree}
              />
            </div>
            <div className="col-12 col-sm-6">
              <TextFieldGroup
                label="Field of study"
                placeholder="Ex: Computer Science"
                name="fieldOfStudy"
                value={fieldOfStudy}
                onChange={onChange}
                error={errors.fieldOfStudy}
              />
            </div>
            <div className="col-12 col-sm-6">
              <TextFieldGroup
                label="From Date"
                type="date"
                name="from"
                value={from}
                onChange={onChange}
                error={errors.from}
              />
            </div>
            <div className="col-12 col-sm-6">
              <TextFieldGroup
                label="To Date"
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
                  Currently attending
                </label>
              </div>
            </div>
          </div>
          <TextAreaFieldGroup
            label="Description"
            name="description"
            value={description}
            onChange={onChange}
            error={errors.description}
            info="Tell us about the program"
            optional
          />
          <div className="d-flex justify-content-between mt-4">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <button className="btn btn-info">Add education</button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

View.propTypes = {
  errors: PropTypes.object.isRequired,
  school: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  fieldOfStudy: PropTypes.string.isRequired,
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
