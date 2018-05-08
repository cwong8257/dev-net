import React from 'react';
import PropTypes from 'prop-types';

const View = ({ repos }) => {
  const repoItems = repos.map(({
    id,
    html_url: htmlUrl,
    name,
    description,
    stargazers_count: stargazersCount,
    watchers_count: watchersCount,
    forks_count: forksCount,
  }) => (
    <li key={id} className="list-group-item">
      <div className="float-right d-none d-sm-inline">
        <span className="badge badge-secondary mr-1">Watchers: {watchersCount}</span>
        <span className="badge badge-info mr-1">Stars: {stargazersCount}</span>
        <span className="badge badge-success">Forks: {forksCount}</span>
      </div>
      <h4>
        <a href={htmlUrl} target="_blank">
          {name}
        </a>
      </h4>
      <p className="text-muted">{description}</p>
    </li>
  ));

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h4 className="card-title text-info">Latest GitHub Repos</h4>
      </div>
      {repos.length > 0 ? (
        <ul className="list-group list-group-flush">{repoItems}</ul>
      ) : (
        <p className="text-muted font-italic text-center">No repos found</p>
      )}
    </div>
  );
};

View.propTypes = {
  repos: PropTypes.array,
};

View.defaultProps = {
  repos: [],
};

export default View;
