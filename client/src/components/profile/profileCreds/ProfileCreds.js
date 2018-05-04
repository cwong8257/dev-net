import React from 'react';
import PropTypes from 'prop-types';

import ProfileList from './ProfileList';

const ProfileCreds = ({ experience, education }) => {
  const experienceData = experience.map(({
    _id, title, company, from, to, description, location,
  }) => ({
    id: _id,
    primary: title,
    secondary: company,
    from,
    to,
    rest: [location, description],
  }));
  const educationData = education.map(({
    _id, school, degree, from, to, description, fieldOfStudy,
  }) => ({
    id: _id,
    primary: school,
    secondary: `${degree}, ${fieldOfStudy}`,
    from,
    to,
    rest: [description],
  }));

  return (
    <div>
      <ProfileList title="Experience" items={experienceData} />
      <ProfileList title="Education" items={educationData} />
    </div>
  );
};

ProfileCreds.propTypes = {
  experience: PropTypes.array,
  education: PropTypes.array,
};

ProfileCreds.defaultProps = {
  experience: [],
  education: [],
};

export default ProfileCreds;
