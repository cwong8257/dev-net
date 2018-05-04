import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  state = {
    repos: [],
  };

  componentDidMount = async () => {
    const { username, count, sort } = this.props;
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`);
      const repos = await response.json();
      this.setState(() => ({ repos }));
    } catch (err) {
      this.setState(() => ({ repos: [] }));
    }
  };

  render() {
    const { repos } = this.state;
    const repoItems = repos.map(({
      id,
      html_url: htmlUrl,
      name,
      description,
      stargazers_count: stargazersCount,
      watchers_count: watchersCount,
      forks_count: forksCount,
    }) => (
      <li key={id} className="list-group-item">
        <div className="float-right d-none d-sm-inline">
          <span className="badge badge-secondary mr-1">Watchers: {watchersCount}</span>
          <span className="badge badge-info mr-1">Stars: {stargazersCount}</span>
          <span className="badge badge-success">Forks: {forksCount}</span>
        </div>
        <h4>
          <Link to={htmlUrl} target="_blank">
            {name}
          </Link>
        </h4>
        <p className="text-muted">{description}</p>
      </li>
    ));

    return (
      <div className="card mb-3">
        <div className="card-body">
          <h4 className="card-title text-info">Latest GitHub Repos</h4>
        </div>
        <ul className="list-group list-group-flush">{repoItems}</ul>
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileGithub;
