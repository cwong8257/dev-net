import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileSkills from './ProfileSkills';
import ProfileCreds from './profileCreds/ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileHeader from './ProfileHeader';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
  componentDidMount = () => {
    const { handle } = this.props.match.params;

    if (handle) {
      this.props.getProfileByHandle(handle);
    }
  };

  render() {
    const { profile, loading } = this.props.profile;

    if (profile === null || loading) {
      return <Spinner />;
    }

    return (
      <div>
        <ProfileHeader {...profile} />
        <ProfileCreds education={profile.education} experience={profile.experience} />
        <ProfileSkills skills={profile.skills} />
        <ProfileGithub username={profile.githubUsername} count={5} sort="created: asc" />
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      handle: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = ({ profile }) => ({
  profile,
});

const mapDispatchToProps = {
  getProfileByHandle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
