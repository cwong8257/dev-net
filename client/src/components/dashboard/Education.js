import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
  state = {};

  onDeleteClick = (educationId) => {
    this.props.deleteEducation(educationId);
  };

  render() {
    const education = this.props.education.map(({
      _id, school, degree, from, to,
    }) => (
      <tr key={_id}>
        <td>{school}</td>
        <td>{degree}</td>
        <td>
          <Moment format="MMM DD, YYYY">{from}</Moment>
          {' - '}
          {to ? <Moment format="MMM DD, YYYY">{to}</Moment> : 'present'}
        </td>
        <td>
          <button onClick={() => this.onDeleteClick(_id)} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Education Credientials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  education: PropTypes.array.isRequired,
};

const mapDispatchToProps = {
  deleteEducation,
};

export default connect(null, mapDispatchToProps)(Education);
