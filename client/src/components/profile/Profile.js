import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import ProfileSkills from './ProfileSkills';
import ProfileCreds from './profileCreds/ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileHeader from './ProfileHeader';
import Spinner from '../common/Spinner';
import {
  getProfileByHandle,
  getProfileById,
  clearProfileLoading,
} from '../../actions/profileActions';

class Profile extends Component {
  state = { loading: true };

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    const { handle, userId } = this.props.match.params;

    if (handle) {
      await this.props.getProfileByHandle(handle);
    } else if (userId) {
      await this.props.getProfileById(userId);
    }
    this.setState(() => ({ loading: false }));
  };

  render() {
    const { profile } = this.props.profile;
    const { loading } = this.state;

    if (loading) {
      return <Spinner />;
    } else if (!loading && profile === null) {
      return <Redirect to="/not-found" />;
    }

    const editable = profile.user._id === this.props.auth.user.id;

    return (
      <div>
        <ProfileHeader editable={editable} {...profile} />
        <ProfileCreds education={profile.education} experience={profile.experience} />
        <ProfileSkills skills={profile.skills} />
        <ProfileGithub username={profile.githubUsername} />
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      handle: PropTypes.string,
      userId: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth, profile }) => ({
  auth,
  profile,
});

const mapDispatchToProps = {
  getProfileByHandle,
  getProfileById,
  clearProfileLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
