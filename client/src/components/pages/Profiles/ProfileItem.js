import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  user, status, company, location, website, social, bio, handle, skills,
}) => {
  const {
    twitter, facebook, linkedin, youtube, instagram,
  } = social;
  const { avatar, name } = user;
  const skillsList = skills.slice(0, 4).map(skill => (
    <li key={skill} className="list-group-item bg-light">
      <i className="fa fa-check mr-2" />
      {skill}
    </li>
  ));

  return (
    <div className="card bg-light text-center text-md-left shadow mb-4">
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3">
            <img className="img-fluid rounded-circle mb-3" src={avatar} alt={name} />
          </div>
          <div className="col-12 col-md-8 col-lg-6">
            <h2>{name}</h2>
            <p>
              {status} {company && <span> at {company}</span>}
            </p>
            {location && <p className="text-muted">{location}</p>}
            <p>
              {website && (
                <a className="text-info mx-2" href={website} target="_blank">
                  <i className="fas fa-globe fa-2x" />
                </a>
              )}
              {twitter && (
                <a className="text-info mx-2" href={twitter} target="_blank">
                  <i className="fab fa-twitter fa-2x" />
                </a>
              )}
              {facebook && (
                <a className="text-info mx-2" href={facebook} target="_blank">
                  <i className="fab fa-facebook fa-2x" />
                </a>
              )}
              {linkedin && (
                <a className="text-info mx-2" href={linkedin} target="_blank">
                  <i className="fab fa-linkedin fa-2x" />
                </a>
              )}
              {youtube && (
                <a className="text-info mx-2" href={youtube} target="_blank">
                  <i className="fab fa-youtube fa-2x" />
                </a>
              )}
              {instagram && (
                <a className="text-info mx-2" href={instagram} target="_blank">
                  <i className="fab fa-instagram fa-2x" />
                </a>
              )}
            </p>
            <Link to={`/profile/${handle}`} className="btn btn-info">
              <i className="fas fa-user mr-2" />View Profile
            </Link>
          </div>
          <div className="col-lg-3 d-none d-lg-block">
            <ul className="list-group list-group-flush">{skillsList}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  social: PropTypes.object,
  user: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  company: PropTypes.string,
  location: PropTypes.string,
  website: PropTypes.string,
  bio: PropTypes.string,
  skills: PropTypes.array,
  handle: PropTypes.string,
};

ProfileItem.defaultProps = {
  social: {},
  company: null,
  location: null,
  website: null,
  bio: null,
  skills: [],
  handle: null,
};

export default ProfileItem;
