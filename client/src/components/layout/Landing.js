import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div className="landing">
    <div className="dark-overlay">
      <div className="container text-center text-white">
        <div className="row justify-content-center">
          <div className="col-4 d-flex flex-column">
            <h1 className="display-4 mb-3">Developer Connector</h1>
            <p className="mb-3">
              Create a developer profile/portfolio, share posts and get help from other developers
            </p>
            <Link to="/register" className="btn btn-lg btn-info mb-3">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-lg btn-light mb-3">
              Login
            </Link>
            <Link to="/profiles" className="btn btn-lg btn-link text-white mb-3">
              View profiles
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Landing;
