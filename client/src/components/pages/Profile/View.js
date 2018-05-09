import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Github from './Github';
import Skills from './Skills';
import Credentials from './Credentials';
import Header from './Header';
import Spinner from '../../common/Spinner';

const View = ({ profile, loading, auth }) => {
  if (loading) {
    return <Spinner />;
  } else if (!loading && profile === null) {
    return <Redirect to="/not-found" />;
  }

  const editable = profile.user._id === auth.user.id;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Header editable={editable} {...profile} />
        </div>
        <div className="col-12 col-lg-9 order-lg-1">
          <Credentials education={profile.education} experience={profile.experience} />
        </div>
        <div className="col-12 col-lg-3 order-lg-0">
          <Skills skills={profile.skills} />
        </div>
        <div className="col-12 col-lg-9 order-lg-2 ml-lg-auto">
          <Github />
        </div>
      </div>
    </div>
  );
};

View.propTypes = {
  profile: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
};

View.defaultProps = {
  profile: {},
};

export default View;
