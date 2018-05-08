import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import View from './View';
import {
  getProfileByHandle,
  getProfileById,
  clearProfileLoading,
} from '../../../actions/profileActions';

class Profile extends Component {
  static propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object,
    match: PropTypes.shape({
      params: PropTypes.shape({
        handle: PropTypes.string,
        userId: PropTypes.string,
      }),
    }).isRequired,
    auth: PropTypes.object.isRequired,
  };

  static defaultProps = {
    profile: {},
  };

  state = { loading: true };

  async componentDidMount() {
    await this.getProfile();
    const { handle, user } = this.props.profile;
    document.title = `${handle} (${user.name}) | DevNet`;
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
    return <View {...this.props} {...this.state} />;
  }
}

const mapStateToProps = ({ auth, profile }) => ({
  auth,
  profile: profile.profile,
});

const mapDispatchToProps = {
  getProfileByHandle,
  getProfileById,
  clearProfileLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
