import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import { logoutUser } from '../../actions/authActions';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';

class Dashboard extends Component {
  state = {};

  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  onDeleteClick = (e) => {
    this.props.deleteAccount();
    this.props.logoutUser();
  };

  render() {
    const { profile, loading } = this.props.profile;
    const { user } = this.props.auth;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">
            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
          </p>
          <ProfileActions />
          <div className="mb-5">
            <button className="btn btn-danger" onClick={this.onDeleteClick}>
              Delete My Account
            </button>
          </div>
        </div>
      );
    } else {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = ({ profile, auth }) => ({
  profile,
  auth,
});

const mapDispatchToProps = {
  getCurrentProfile,
  deleteAccount,
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
