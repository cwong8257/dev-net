import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import PostItem from '../posts/PostItem';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';

class Post extends Component {
  state = {};

  componentDidMount = () => {
    this.props.getPost(this.props.match.params.postId);
  };

  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem {...post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
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
