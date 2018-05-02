import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileItem extends Component {
  state = {};
  render() {
    const {
      user, status, company, location, handle, skills,
    } = this.props;
    return (
      <div className="card bg-light mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-2">
              <img src={user.avatar} alt={user.name} className="rounded-circle" />
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{user.name}</h3>
              <p>
                {status} {company && <span>at {company} </span>}
              </p>
              <p>{location && <span>{location}</span>}</p>
              <Link to={`/profile/${handle}`} className="btn btn-info">
                View Profile
              </Link>
            </div>
            <div className="col-md-4 d-none d-md-block">
              <h4>Skill Set</h4>
              <ul className="list-group">
                {skills.slice(0, 4).map(skill => (
                  <li key={skill} className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  user: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  skills: PropTypes.array.isRequired,
};

export default ProfileItem;
