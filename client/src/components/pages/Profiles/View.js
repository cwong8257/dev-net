import React from 'react';
import PropTypes from 'prop-types';

import ProfileItem from './ProfileItem';
import Spinner from '../../common/Spinner';

const View = ({ loading, profiles, RenderLoading }) => {
  let profileItems;

  if (loading) {
    profileItems = <RenderLoading />;
  } else if (profiles.length === 0) {
    profileItems = <h4>No profiles found...</h4>;
  } else {
    profileItems = profiles.map(profile => <ProfileItem key={profile._id} {...profile} />);
  }

  return (
    <div className="container">
      <h1 className="display-4 text-center">Developer Profiles</h1>
      <p className="lead text-center">Browse and connect with developers</p>
      {profileItems}
    </div>
  );
};

View.propTypes = {
  profiles: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  RenderLoading: PropTypes.func,
};

View.defaultProps = {
  RenderLoading: Spinner,
  profiles: [],
};

export default View;
