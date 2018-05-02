import React, { Component } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

class ProfileCreds extends Component {
  state = {};
  render() {
    const { experience, education } = this.props;

    const experienceList = experience.map(({
      _id, company, from, to, title, location, description,
    }) => (
      <li key={_id} className="list-group-item">
        <h4>{company}</h4>
        <p>
          <Moment format="MMM DD, YYYY">{from}</Moment>
          {' - '}
          {to ? <Moment format="MMM DD, YYYY">{to}</Moment> : 'present'}
        </p>
        <p>
          <strong>Position:</strong> {title}
        </p>
        {location && (
        <p>
          <strong>Location:</strong> {location}
        </p>
          )}
        {description && (
        <p>
          <strong>Description:</strong> {description}
        </p>
          )}
      </li>
    ));

    const educationList = education.map(({
      _id, school, from, to, degree, description, fieldOfStudy,
    }) => (
      <li key={_id} className="list-group-item">
        <h4>{school}</h4>
        <p>
          <Moment format="MMM DD, YYYY">{from}</Moment>
          {' - '}
          {to ? <Moment format="MMM DD, YYYY">{to}</Moment> : 'present'}
        </p>
        <p>
          <strong>Degree:</strong> {degree}
        </p>
        <p>
          <strong>Field Of Study:</strong> {fieldOfStudy}
        </p>
        {description && (
        <p>
          <strong>Description:</strong> {description}
        </p>
          )}
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {experienceList.length > 0 ? (
            <ul className="list-group">{experienceList}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {educationList.length > 0 ? (
            <ul className="list-group">{educationList}</ul>
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
        </div>
      </div>
    );
  }
}

ProfileCreds.propTypes = {
  experience: PropTypes.array,
  education: PropTypes.array,
};

ProfileCreds.defaultProps = {
  experience: [],
  education: [],
};

export default ProfileCreds;
