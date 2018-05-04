import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import PropTypes from 'prop-types';

const DateRange = ({ className, from, to }) => {
  const fromMoment = moment(from);
  const toMoment = moment(to);
  const duration = to
    ? moment.duration(fromMoment.diff(toMoment)).humanize()
    : moment.duration(fromMoment.diff()).humanize();

  return (
    <div className={className}>
      <Moment format="MMM YYYY">{from}</Moment>&nbsp;&ndash;&nbsp;
      {to ? <Moment format="MMM YYYY">{to}</Moment> : 'Present'}&nbsp;&nbsp;&bull;&nbsp;&nbsp;{
        duration
      }
    </div>
  );
};

DateRange.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string,
  className: PropTypes.string,
};

DateRange.defaultProps = {
  to: null,
  className: null,
};

export default DateRange;
