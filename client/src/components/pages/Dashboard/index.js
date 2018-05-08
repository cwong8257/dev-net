import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import View from './View';
import { logoutUser } from '../../../actions/authActions';
import { getCurrentProfile, deleteAccount } from '../../../actions/profileActions';

class Dashboard extends Component {
  state = { loading: true };

  async componentDidMount() {
    await this.props.getCurrentProfile();
    this.setState({ loading: false });
  }

  onDeleteClick = (e) => {
    this.props.deleteAccount();
    this.props.logoutUser();
  };

  render() {
    return <View {...this.props} {...this.state} />;
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ profile, auth }) => ({
  profile: profile.profile,
  user: auth.user,
});

const mapDispatchToProps = {
  getCurrentProfile,
  deleteAccount,
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
