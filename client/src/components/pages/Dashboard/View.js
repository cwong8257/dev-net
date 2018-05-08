import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Experience from './Experience';
import Education from './Education';
import Spinner from '../../common/Spinner';

const View = ({
  profile, user, loading, onDeleteClick,
}) => {
  let dashboardContent;

  if (loading) {
    dashboardContent = <Spinner />;
  } else if (Object.keys(profile).length > 0) {
    dashboardContent = (
      <div>
        <p className="lead text-muted mb-3">
          Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
        </p>
        <Experience experience={profile.experience} />
        <Education education={profile.education} />
        <div className="mb-3">
          <button className="btn btn-danger" onClick={onDeleteClick}>
            <i className="fas fa-trash-alt mr-2" />
            Delete your account
          </button>
        </div>
      </div>
    );
  } else {
    dashboardContent = (
      <div>
        <p className="lead text-muted mb-3">Welcome {user.name}</p>
        <p>You have not yet setup a profile, please add some info</p>
        <Link to="/create-profile" className="btn btn-info">
          Create Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="mb-3">Dashboard</h2>
      {dashboardContent}
    </div>
  );
};

View.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  profile: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

View.defaultProps = {
  profile: null,
};

export default View;
