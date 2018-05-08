import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import View from './View';
import Spinner from '../../common/Spinner';
import { getPosts } from '../../../actions/postActions';
import { getCurrentProfile } from '../../../actions/profileActions';

class Posts extends Component {
  componentDidMount() {
    document.title = 'Post Feed | DevNet';
    this.loadAllData();
  }

  loadAllData = () => {
    this.props.getPosts();
    this.props.getCurrentProfile();
  };

  render() {
    const { posts, loading } = this.props.post;
    const { avatar, name } = this.props.auth.user;
    const { profile } = this.props.profile;

    if (posts === null || profile === null || loading) {
      return <Spinner />;
    }

    const { handle, bio } = profile;

    return <View avatar={avatar} name={name} handle={handle} bio={bio} posts={posts} />;
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth, post, profile }) => ({ auth, post, profile });

const mapDispatchToProps = {
  getPosts,
  getCurrentProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
