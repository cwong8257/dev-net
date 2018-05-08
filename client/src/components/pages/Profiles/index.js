import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import View from './View';
import { getProfiles } from '../../../actions/profileActions';

class Profiles extends Component {
  static propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profiles: PropTypes.array,
  };

  static defaultProps = {
    profiles: [],
  };

  state = { loading: true };

  async componentDidMount() {
    try {
      await this.props.getProfiles();
      this.setState((prevState, props) => ({
        loading: false,
        profiles: props.profiles,
      }));
    } catch (err) {
      this.setState({ loading: false });
    }
  }

  render() {
    return <View {...this.props} {...this.state} />;
  }
}

const mapStateToProps = ({ profile }) => ({
  profiles: profile.profiles,
});

const mapDispatchToProps = {
  getProfiles,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
