import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { deleteComment } from '../../../actions/postActions';

class CommentItem extends Component {
  handleDeleteClick = () => {
    const { postId, _id } = this.props;
    this.props.deleteComment(postId, _id);
  };

  render() {
    const {
      auth, avatar, name, text, user, date,
    } = this.props;
    const time = moment(date).fromNow();

    return (
      <div className="card shadow mb-4">
        <div className="card-body">
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
            <div className="col-12 mb-3">{text}</div>
          </div>
        </div>
        {user === auth.user.id && (
          <div className="card-footer">
            <button
              type="button"
              onClick={this.handleDeleteClick}
              className="btn btn-sm btn-light mr-2"
            >
              <i className="fas fa-trash-alt text-danger mr-2" />Delete
            </button>
          </div>
        )}
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
  date: PropTypes.string.isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = {
  deleteComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
