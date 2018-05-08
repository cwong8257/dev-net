import React from 'react';
import PropTypes from 'prop-types';

import CredentialListItem from './CredentialListItem';

const ProfileList = ({ title, items }) => {
  const list = items.map(data => <CredentialListItem key={data.id} {...data} />);
  const capitalizedTitle = title.charAt(0).toUpperCase() + title.toLowerCase().slice(1);
  const lowercaseTitle = title.toLowerCase();
  return (
    <div className="card mb-3">
      <div className="card-body pb-0">
        <h4 className="card-title text-info">{capitalizedTitle}</h4>
      </div>
      {items.length > 0 ? (
        <ul className="list-group list-group-flush">{list}</ul>
      ) : (
        <p className="text-muted font-italic text-center">{`No ${lowercaseTitle} listed`}</p>
      )}
    </div>
  );
};

ProfileList.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array,
};

ProfileList.defaultProps = {
  items: [],
};

export default ProfileList;
