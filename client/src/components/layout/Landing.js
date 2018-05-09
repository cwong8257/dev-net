import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div className="landing">
    <div className="dark-overlay">
      <div className="landing-header">
        <h1 className="display-3 mb-4">DevNet</h1>
        <p className="mb-4">Connect and share ideas with other developers</p>
        <Link to="/register" className="btn btn-lg btn-info mb-3">
          Get started
        </Link>
        <Link to="/login" className="btn btn-lg btn-light mb-3">
          Sign in
        </Link>
        <Link to="/profiles" className="btn btn-link text-white">
          <i className="far fa-compass mr-2" />View profiles
        </Link>
      </div>
    </div>
  </div>
);

export default Landing;
