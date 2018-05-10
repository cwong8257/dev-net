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
    language,
    language_color: languageColor,
  }) => (
    <li key={id} className="list-group-item bg-light px-0 d-flex flex-column d-lg-block">
      <div className="order-2 order-lg-0 d-inline float-right">
        <span className="btn btn-sm btn-secondary py-0 mr-1" title="Watchers">
          <i className="fas fa-eye mr-2" />
          <span className="badge badge-light">{watchersCount}</span>
        </span>
        <span className="btn btn-sm btn-info py-0 mr-1" title="Stars">
          <i className="fas fa-star mr-2" />
          <span className="badge badge-light">{stargazersCount}</span>
        </span>
        <span className="btn btn-sm btn-success py-0" title="Forks">
          <i className="fas fa-code-branch mr-2" />
          <span className="badge badge-light">{forksCount}</span>
        </span>
      </div>
      <h5 className="order-0 order-lg-1">
        <a href={htmlUrl} target="_blank">
          {name}
        </a>
      </h5>
      <p className="text-muted order-1 order-lg-2">{description}</p>
      <span className="d-flex flex-row align-items-center small">
        <i
          className="rounded-circle mr-2"
          style={{
              background: languageColor,
              height: '12px',
              width: '12px',
            }}
        />
        {language}
      </span>
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
