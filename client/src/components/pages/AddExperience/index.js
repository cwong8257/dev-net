import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import View from './View';
import { addExperience } from '../../../actions/profileActions';

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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = ({ profile, errors }) => ({ profile, errors });
const mapDispatchToProps = {
  addExperience,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExperience);
