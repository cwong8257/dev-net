import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

class ProfileGithub extends Component {
  state = {
    clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
    clientSecret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
    count: 5,
    sort: 'created: asc',
    repos: [],
  };

  componentDidMount = async () => {
    const { username } = this.props;
    const {
      count, sort, clientId, clientSecret,
    } = this.state;
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`);
      this.setState(() => ({ repos: response.data }));
    } catch (err) {
      console.log(err);
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
      <div key={id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={htmlUrl} className="text-info" target="_blank">
                {name}
              </Link>
            </h4>
            <p>{description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">Stars: {stargazersCount}</span>
            <span className="badge badge-secondary mr-1">Watchers: {watchersCount}</span>
            <span className="badge badge-success">Forks: {forksCount}</span>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileGithub;
