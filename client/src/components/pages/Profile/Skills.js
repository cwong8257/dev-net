import React from 'react';
import PropTypes from 'prop-types';

const ProfileSkills = ({ skills }) => {
  const skillsList = skills.map(skill => (
    <div key={skill} className="p-3">
      <i className="fa fa-check" /> {skill}
    </div>
  ));

  return (
    <div className="card bg-light shadow mb-4">
      <div className="card-header h4 text-info">Skills</div>
      <div className="card-body">
        <div className="d-flex flex-wrap flex-lg-column">{skillsList}</div>
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
