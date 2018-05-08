import React from 'react';
import PropTypes from 'prop-types';

import PostForm from './PostForm';
import PostFeed from './PostFeed';

const View = ({
  avatar, name, handle, bio, posts,
}) => (
  <div className="container">
    <div className="row">
      <div className="col-md-3 d-none d-md-block">
        <div className="card shadow">
          <img src={avatar} alt={name} className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <h6 className="card-subtitle text-muted mb-3">{handle}</h6>
            <p className="card-text small">{bio}</p>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-9">
        <PostForm />
        <PostFeed posts={posts} />
      </div>
    </div>
  </div>
);

View.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  bio: PropTypes.string,
};

View.defaultProps = {
  bio: null,
};

export default View;
