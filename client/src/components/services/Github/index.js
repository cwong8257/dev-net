import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Github extends Component {
  static propTypes = {
    Render: PropTypes.func.isRequired,
  };

  state = {};

  async componentDidMount() {
    await this.getRepos();
  }

  getRepos = async () => {
    const { profile } = this.props;
    const { githubUsername } = profile.profile;

    if (!githubUsername) {
      return this.setState(() => ({ repos: [] }));
    }

    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

    try {
      const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=5&sort=created: asc&client_id=${clientId}&client_secret=${clientSecret}`);
      const repos = await response.json();

      return this.setState(() => ({ repos }));
    } catch (err) {
      return this.setState(() => ({ repos: [] }));
    }
  };

  render() {
    const { Render } = this.props;

    return <Render {...this.state} />;
  }
}

const mapStateToProps = ({ auth, profile }) => ({
  auth,
  profile,
});

export default connect(mapStateToProps)(Github);
