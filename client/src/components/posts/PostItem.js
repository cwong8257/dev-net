import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { deletePost, addLike, removeLike } from '../../actions/postActions';

class PostItem extends Component {
  state = {};

  onDeleteClick = (id) => {
    this.props.deletePost(id);
  };

  onLikeClick = (id) => {
    this.props.addLike(id);
  };

  onUnlikeClick = (id) => {
    this.props.removeLike(id);
  };

  findUserLike(likes) {
    const { auth } = this.props;

    return likes.filter(like => like.user === auth.user.id).length > 0;
  }

  render() {
    const {
      auth, _id, avatar, name, likes, text, user, showActions,
    } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img className="rounded-circle d-none d-md-block" src={avatar} alt="" />
            </a>
            <br />
            <p className="text-center">{name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{text}</p>
            {showActions && (
              <span>
                <button
                  type="button"
                  onClick={e => this.onLikeClick(_id)}
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(likes),
                    })}
                  />
                  <span className="badge badge-light">{likes.length}</span>
                </button>
                <button
                  type="button"
                  onClick={e => this.onUnlikeClick(_id)}
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${_id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {user === auth.user.id && (
                  <button
                    type="button"
                    onClick={e => this.onDeleteClick(_id)}
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                )}
              </span>
            )}
          </div>
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
  text: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  showActions: PropTypes.bool,
};

PostItem.defaultProps = {
  showActions: true,
};

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = {
  deletePost,
  addLike,
  removeLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
