import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

class PostItem extends Component {
  state = {};

  onDeleteClick = (id) => {
    console.log(id);
  };

  render() {
    const {
      auth, _id, avatar, name, likes, text, user,
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
            <button type="button" className="btn btn-light mr-1">
              <i className="text-info fas fa-thumbs-up" />
              <span className="badge badge-light">{likes.length}</span>
            </button>
            <button type="button" className="btn btn-light mr-1">
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
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  _id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(PostItem);
