import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { deletePost, addLike, removeLike } from '../../actions/postActions';

class PostItem extends Component {
  handleDeleteClick = () => {
    this.props.deletePost(this.props._id);
  };

  handleLikeClick = () => {
    const { _id, likes } = this.props;

    if (this.findUserLike(likes)) {
      this.props.removeLike(_id);
    } else {
      this.props.addLike(_id);
    }
  };

  findUserLike = (likes) => {
    const { auth } = this.props;

    return likes.filter(like => like.user === auth.user.id).length > 0;
  };

  render() {
    const {
      auth,
      _id,
      avatar,
      name,
      likes,
      text,
      user,
      comments,
      showCommentButton,
      date,
    } = this.props;
    const time = moment(date).fromNow();
    const liked = this.findUserLike(likes);

    return (
      <div className="card my-4">
        <div className="card-body pb-0">
          <div className="row">
            <div className="col-12 mb-3">
              <Link className="mr-3" to={`/profile/user/${user}`}>
                <img
                  className="rounded-circle float-left"
                  src={avatar}
                  alt={name}
                  height={64}
                  width={64}
                />
              </Link>
              <div className="d-inline-block">
                <h5>{name}</h5>
                <p className="small text-muted">{time}</p>
              </div>
            </div>
            <div className="col-12 mb-3">
              <p>{text}</p>
              <span className="small text-muted">
                {likes.length} Likes &bull; {comments.length} Comments
              </span>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button
            type="button"
            onClick={this.handleLikeClick}
            className="btn btn-sm btn-light mr-1"
          >
            <i
              className={classnames('fas fa-thumbs-up', {
                'text-info': liked,
              })}
            />
            <span className="ml-2">{liked ? 'Liked' : 'Like'}</span>
          </button>
          {showCommentButton && (
            <Link to={`/post/${_id}`} className="btn btn-sm btn-light mr-1">
              <i className="fas fa-comments" />
              <span className="ml-2">Comments</span>
            </Link>
          )}
          {user === auth.user.id && (
            <button
              type="button"
              onClick={this.handleDeleteClick}
              className="btn btn-sm btn-light mr-1"
            >
              <span className="text-danger">
                <i className="fas fa-trash-alt" /> Delete
              </span>
            </button>
          )}
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  _id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  showCommentButton: PropTypes.bool,
};

PostItem.defaultProps = {
  showCommentButton: true,
};

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = {
  deletePost,
  addLike,
  removeLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
