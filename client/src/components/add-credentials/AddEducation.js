import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
  static getDerivedStateFromProps = ({ errors }) => ({ errors });

  state = {
    school: '',
    degree: '',
    fieldOfStudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
    errors: {},
    disabled: false,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const educationData = (({
      school, degree, fieldOfStudy, from, to, current, description,
    }) => ({
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    }))(this.state);

    this.props.addEducation(educationData, this.props.history);
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  onCheck = (e) => {
    this.setState(({ current, disabled }) => ({
      current: !current,
      disabled: !disabled,
    }));
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="* Field of Study"
                  name="fieldOfStudy"
                  value={this.state.fieldOfStudy}
                  onChange={this.onChange}
                  error={errors.fieldOfStudy}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  type="date"
                  name="from"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    name="current"
                    className="form-check-input"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Currently Attending
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the program"
                />
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = ({ profile, errors }) => ({ profile, errors });
const mapDispatchToProps = {
  addEducation,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEducation));
