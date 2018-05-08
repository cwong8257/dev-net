import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import View from './View';
import { addEducation } from '../../../actions/profileActions';

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
    return (
      <View
        {...this.props}
        {...this.state}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        onCheck={this.onCheck}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddEducation);
