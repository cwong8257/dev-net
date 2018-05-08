import React from 'react';
import PostForm from './PostForm';
import PostFeed from './PostFeed';

const View = ({
  avatar, name, handle, bio, posts,
}) => (
  <div className="container">
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
  </div>
);

export default View;
