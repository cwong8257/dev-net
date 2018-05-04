import React from 'react';
import PropTypes from 'prop-types';

const ProfileHeader = ({
  user, status, company, location, website, social, bio,
}) => {
  const {
    twitter, facebook, linkedin, youtube, instagram,
  } = social;
  const { avatar, name } = user;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-sm-3">
            <img className="rounded-circle img-thumbnail" src={avatar} alt={name} />
          </div>
          <div className="col-12 col-sm-9">
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
};

ProfileHeader.defaultProps = {
  social: {},
  company: null,
  location: null,
  website: null,
  bio: null,
};

export default ProfileHeader;
