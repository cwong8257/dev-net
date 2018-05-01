import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile } from '../../actions/profileActions';

class Dashboard extends Component {
  state = {};

  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  render() {
    return <div />;
  }
}

const mapDispatchToProps = {
  getCurrentProfile,
};

export default connect(null, mapDispatchToProps)(Dashboard);
