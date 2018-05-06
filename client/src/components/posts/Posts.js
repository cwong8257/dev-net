import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';
import { getCurrentProfile } from '../../actions/profileActions';

class Posts extends Component {
  componentDidMount = () => {
    this.props.getPosts();
    this.props.getCurrentProfile();
  };

  render() {
    const { posts, loading } = this.props.post;
    const { avatar, name } = this.props.auth.user;
    const { profile } = this.props.profile;

    if (posts === null || profile === null || loading) {
      return <Spinner />;
    }

    const { handle, bio } = profile;

    return (
      <div className="row">
        <div className="d-none d-md-block col-md-3">
          <div className="card border-0">
            <img src={avatar} alt={name} className="card-img-top" />
            <div className="card-body px-0">
              <h4 className="card-title">{name}</h4>
              <h5 className="card-subtitle text-muted mb-3">{handle}</h5>
              <p className="card-text">{bio}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-9">
          <PostForm />
          <PostFeed posts={posts} />
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth, post, profile }) => ({ auth, post, profile });

const mapDispatchToProps = {
  getPosts,
  getCurrentProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
