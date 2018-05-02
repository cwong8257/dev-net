import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

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
        <h4 className="mb-4">Experience Credientials</h4>
        <table className="table">
          <thead>
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
