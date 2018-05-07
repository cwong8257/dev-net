import React from 'react';
import PropTypes from 'prop-types';

const ProfileSkills = ({ skills }) => {
  const skillsList = skills.map(skill => (
    <div key={skill} className="p-3">
      <i className="fa fa-check" /> {skill}
    </div>
  ));

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h4 className="card-title text-info">Skill Set</h4>
        <div className="d-flex flex-wrap">{skillsList}</div>
      </div>
    </div>
  );
};

ProfileSkills.propTypes = {
  skills: PropTypes.array,
};

ProfileSkills.defaultProps = {
  skills: [],
};

export default ProfileSkills;
