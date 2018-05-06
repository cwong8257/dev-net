import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DateRange from '../common/DateRange';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {
  state = {};

  onDeleteClick = (experienceId) => {
    this.props.deleteExperience(experienceId);
  };

  render() {
    const experience = this.props.experience.map(({
      _id, company, title, from, to,
    }) => (
      <tr key={_id}>
        <td>{company}</td>
        <td>{title}</td>
        <td>
          <DateRange from={from} to={to} />
        </td>
        <td className="float-right">
          <button onClick={() => this.onDeleteClick(_id)} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div className="mb-4">
        <Link to="/add-experience" className="btn btn-light float-right">
          <i className="fas fa-plus text-info mr-1" /> Add Experience
        </Link>
        <h4 className="mb-4">Experience</h4>
        {experience.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Company</th>
                  <th>Title</th>
                  <th>Years</th>
                  <th />
                </tr>
              </thead>
              <tbody>{experience}</tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-muted font-italic">No experience listed</p>
        )}
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
  experience: PropTypes.array.isRequired,
};

const mapDispatchToProps = {
  deleteExperience,
};

export default connect(null, mapDispatchToProps)(Experience);
