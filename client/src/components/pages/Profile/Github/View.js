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
    <li key={id} className="list-group-item bg-light px-0 d-flex flex-column d-lg-block">
      <div className="order-2 order-lg-0 d-inline float-right">
        <span className="badge badge-secondary mr-1">Watchers: {watchersCount}</span>
        <span className="badge badge-info mr-1">Stars: {stargazersCount}</span>
        <span className="badge badge-success">Forks: {forksCount}</span>
      </div>
      <h5 className="order-0 order-lg-1">
        <a href={htmlUrl} target="_blank">
          {name}
        </a>
      </h5>
      <p className="text-muted order-1 order-lg-2">{description}</p>
    </li>
  ));

  return (
    <div className="card bg-light shadow-sm mb-4">
      <div className="card-header h4 text-info">Latest GitHub Repos</div>
      <div className="card-body">
        {repos.length > 0 ? (
          <ul className="list-group list-group-flush">{repoItems}</ul>
        ) : (
          <p className="text-muted font-italic text-center">No repos found</p>
        )}
      </div>
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
