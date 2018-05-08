import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import PostItem from '../../pages/Posts/PostItem';
import Spinner from '../../common/Spinner';
import { getPost } from '../../../actions/postActions';

class Post extends Component {
  componentDidMount = () => {
    this.props.getPost(this.props.match.params.postId);
  };

  render() {
    const { post, loading } = this.props.post;

    if (post === null || loading || Object.keys(post).length === 0) {
      return <Spinner />;
    }
    return (
      <div className="container">
        <Link to="/feed" className="btn btn-light mb-3">
          Back To feed
        </Link>
        <PostItem {...post} showCommentButton={false} />
        <CommentForm postId={post._id} />
        <CommentFeed postId={post._id} comments={post.comments} />
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      postId: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = ({ post }) => ({ post });
const mapDispatchToProps = {
  getPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
