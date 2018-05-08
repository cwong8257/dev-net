import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createProfile } from '../../../actions/profileActions';
import View from './View';

class CreateProfile extends Component {
  static getDerivedStateFromProps = ({ errors }) => ({ errors });

  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubUsername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {},
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const profileData = (({
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubUsername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
    }) => ({
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubUsername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
    }))(this.state);

    this.props.createProfile(profileData, () => {
      this.props.history.push(`/profile/${this.state.handle}`);
    });
  };

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  handleClickSocial = (e) => {
    this.setState(prevState => ({
      displaySocialInputs: !prevState.displaySocialInputs,
    }));
  };

  render() {
    return (
      <View
        {...this.props}
        {...this.state}
        handleChangeInput={this.handleChangeInput}
        handleSubmit={this.handleSubmit}
        handleClickSocial={this.handleClickSocial}
      />
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = ({ profile, errors }) => ({
  profile,
  errors,
});

const mapDispatchToProps = {
  createProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
