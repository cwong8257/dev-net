import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

class PostFeed extends Component {
  state = {};
  render() {
    const { posts } = this.props;

    return posts.map(post => <PostItem key={post._id} {...post} />);
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostFeed;
