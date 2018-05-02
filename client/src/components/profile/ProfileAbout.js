import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileAbout extends Component {
  state = {};
  render() {
    const { user, bio, skills } = this.props;
    const firstName = user.name.split(' ')[0];
    const skillsList = skills.map(skill => (
      <div key={skill} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}&apos;s Bio</h3>
            {bio ? (
              <p className="lead">{bio}</p>
            ) : (
              <p className="text-center font-italic">No bio</p>
            )}
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skillsList}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  user: PropTypes.object.isRequired,
  skills: PropTypes.array,
  bio: PropTypes.string,
};

ProfileAbout.defaultProps = {
  skills: [],
  bio: null,
};

export default ProfileAbout;
