import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import { addComment } from '../../../actions/postActions';

class CommentForm extends Component {
  static getDerivedStateFromProps = ({ errors }) => ({ errors });

  state = {
    text: '',
    errors: {},
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { text } = this.state;
    const { postId } = this.props;
    const { user } = this.props.auth;
    const { name, avatar } = user;
    const newComment = { text, name, avatar };

    this.props.addComment(postId, newComment);
    this.setState(() => ({ text: '' }));
  };

  onChange = (e) => {
    const { name, value } = e.target;

    this.setState(() => ({ [name]: value }));
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="card shadow-sm mb-4">
        <div className="card-header h5 bg-info text-white">Add a comment</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Reply to post"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              <i className="fas fa-comment mr-2" />
              Add comment
            </button>
          </form>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

const mapStateToProps = ({ auth, errors }) => ({ auth, errors });

const mapDispatchToProps = {
  addComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
