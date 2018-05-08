import React from 'react';
import PropTypes from 'prop-types';

import DateRange from '../../../common/DateRange';

const CredentialListItem = ({
  id, primary, secondary, from, to, rest,
}) => {
  const restItems = rest.map(item => (
    <p key={item} className="mt-2">
      {item}
    </p>
  ));
  return (
    <li key={id} className="list-group-item bg-light px-0">
      <h5>{primary}</h5>
      <span>{secondary}</span>
      <DateRange className="text-muted " from={from} to={to} />
      {restItems}
    </li>
  );
};

CredentialListItem.propTypes = {
  id: PropTypes.string.isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string,
  rest: PropTypes.array,
};

CredentialListItem.defaultProps = {
  to: null,
  rest: [],
};

export default CredentialListItem;
