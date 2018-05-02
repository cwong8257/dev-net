import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileHeader extends Component {
  state = {};
  render() {
    const {
      user, status, company, location, website, social,
    } = this.props;
    const {
      twitter, facebook, linkedin, youtube, instagram,
    } = social;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img className="rounded-circle" src={user.avatar} alt="" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{user.name}</h1>
              <p className="lead text-center">
                {status} {company && <span> at {company}</span>}
              </p>
              {location && <p>{location}</p>}
              <p>
                {website && (
                  <a className="text-white p-2" href={website} target="_blank">
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}
                {twitter && (
                  <a className="text-white p-2" href={twitter} target="_blank">
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}
                {facebook && (
                  <a className="text-white p-2" href={facebook} target="_blank">
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}
                {linkedin && (
                  <a className="text-white p-2" href={linkedin} target="_blank">
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}
                {youtube && (
                  <a className="text-white p-2" href={youtube} target="_blank">
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}
                {instagram && (
                  <a className="text-white p-2" href={instagram} target="_blank">
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileHeader.propTypes = {
  social: PropTypes.object,
  user: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  company: PropTypes.string,
  location: PropTypes.string,
  website: PropTypes.string,
};

ProfileHeader.defaultProps = {
  social: {},
  company: null,
  location: null,
  website: null,
};

export default ProfileHeader;
