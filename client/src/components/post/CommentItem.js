import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postActions';

class CommentItem extends Component {
  state = {};

  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const {
      _id: commentId, avatar, name, text, user, postId, auth,
    } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img className="rounded-circle d-none d-md-block" src={avatar} alt={name} />
            </a>
            <br />
            <p className="text-center">{name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{text}</p>
            {user === auth.user.id && (
              <button
                type="button"
                onClick={e => this.onDeleteClick(postId, commentId)}
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = {
  deleteComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
