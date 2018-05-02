import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addExperience } from '../../actions/profileActions';

class AddExperience extends Component {
  static getDerivedStateFromProps = ({ errors }) => ({ errors });

  state = {
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
    errors: {},
    disabled: false,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const experienceData = (({
      company, title, location, from, to, current, description,
    }) => ({
      company,
      title,
      location,
      from,
      to,
      current,
      description,
    }))(this.state);

    this.props.addExperience(experienceData, this.props.history);
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
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
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
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the position"
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = ({ profile, errors }) => ({ profile, errors });
const mapDispatchToProps = {
  addExperience,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience));
