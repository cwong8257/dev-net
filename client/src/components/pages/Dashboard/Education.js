import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DateRange from '../../common/DateRange';
import { deleteEducation } from '../../../actions/profileActions';

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
        <td className="d-none d-md-table-cell">
          <DateRange from={from} to={to} />
        </td>
        <td className="float-right">
          <button onClick={() => this.onDeleteClick(_id)} className="btn btn-danger">
            <i className="fas fa-trash-alt mr-2" />
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div className="mb-4">
        <Link to="/add-education" className="btn btn-light float-right">
          <i className="fas fa-plus text-info mr-2" />Add Education
        </Link>
        <h4 className="mb-4">Education</h4>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>School</th>
                <th>Degree</th>
                <th className="d-none d-md-table-cell">Years</th>
                <th />
              </tr>
            </thead>
            {education.length > 0 ? (
              <tbody>{education}</tbody>
            ) : (
              <tbody className="text-center font-italic">
                <tr>
                  <td colSpan="4">No education listed...</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
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
