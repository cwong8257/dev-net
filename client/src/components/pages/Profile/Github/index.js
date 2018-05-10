import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import loadData from './loadData';
import View from './View';

class Github extends Component {
  static propTypes = {
    githubUsername: PropTypes.string,
  };

  static defaultProps = {
    githubUsername: null,
  };

  state = { repos: [] };

  async componentDidMount() {
    const { githubUsername } = this.props;
    const repos = await loadData(githubUsername, 6);
    console.log(repos);

    if (Array.isArray(repos)) {
      this.setState({ repos });
    }
  }

  render() {
    return <View {...this.props} {...this.state} />;
  }
}

const mapStateToProps = ({ profile }) => ({
  githubUsername: profile.profile.githubUsername,
});

export default connect(mapStateToProps)(Github);
