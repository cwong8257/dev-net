import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostFrom extends Component {
  static getDerivedStateFromProps = ({ errors }) => ({ errors });

  state = {
    text: '',
    errors: {},
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { text } = this.state;
    const { user } = this.props.auth;
    const { name, avatar } = user;
    const newPost = { text, name, avatar };

    this.props.addPost(newPost);
    this.setState(() => ({ text: '' }));
  };

  onChange = (e) => {
    const { name, value } = e.target;

    this.setState(() => ({ [name]: value }));
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostFrom.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth, errors }) => ({ auth, errors });

const mapDispatchToProps = {
  addPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostFrom);
