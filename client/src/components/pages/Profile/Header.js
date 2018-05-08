import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileHeader = ({
  user, status, company, location, website, social, bio, editable,
}) => {
  const {
    twitter, facebook, linkedin, youtube, instagram,
  } = social;
  const { avatar, name } = user;

  return (
    <div className="card bg-light text-center text-md-left shadow-sm mb-4">
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3 d-inline-flex flex-column align-items-center">
            <img className="img-fluid rounded-circle mb-3" src={avatar} alt={name} />
            {editable && (
              <Link to="/edit-profile" className="btn btn-info mb-3">
                <i className="fas fa-edit mr-2" />Edit Profile
              </Link>
            )}
          </div>
          <div className="col-12 col-md-8 col-lg-9">
            <h2>{name}</h2>
            <p>
              {status} {company && <span> at {company}</span>}
            </p>
            {location && <p className="text-muted">{location}</p>}
            <p>
              {website && (
                <a className="text-info p-2" href={website} target="_blank">
                  <i className="fas fa-globe fa-2x" />
                </a>
              )}
              {twitter && (
                <a className="text-info p-2" href={twitter} target="_blank">
                  <i className="fab fa-twitter fa-2x" />
                </a>
              )}
              {facebook && (
                <a className="text-info p-2" href={facebook} target="_blank">
                  <i className="fab fa-facebook fa-2x" />
                </a>
              )}
              {linkedin && (
                <a className="text-info p-2" href={linkedin} target="_blank">
                  <i className="fab fa-linkedin fa-2x" />
                </a>
              )}
              {youtube && (
                <a className="text-info p-2" href={youtube} target="_blank">
                  <i className="fab fa-youtube fa-2x" />
                </a>
              )}
              {instagram && (
                <a className="text-info p-2" href={instagram} target="_blank">
                  <i className="fab fa-instagram fa-2x" />
                </a>
              )}
            </p>
            <hr className="bg-white" />
            {bio ? <p className="lead">{bio}</p> : <p className="text-muted font-italic">No bio</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  social: PropTypes.object,
  user: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  company: PropTypes.string,
  location: PropTypes.string,
  website: PropTypes.string,
  bio: PropTypes.string,
  editable: PropTypes.bool,
};

ProfileHeader.defaultProps = {
  social: {},
  company: null,
  location: null,
  website: null,
  bio: null,
  editable: false,
};

export default ProfileHeader;
