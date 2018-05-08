import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import { registerUser } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class Register extends Component {
  static getDerivedStateFromProps = ({ errors }) => ({ errors });

  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    errors: '',
  };

  componentDidMount = () => {
    document.title = 'Join DevConnector | DevConnector';
    this.props.clearErrors();
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const {
      name, email, password, confirm,
    } = this.state;
    const newUser = {
      name,
      email,
      password,
      confirm,
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <h1 className="display-4 text-center">Sign up</h1>
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  label="Name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  label="Email address"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={this.state.email}
                  error={errors.email}
                  onChange={this.onChange}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  label="Password"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  label="Confirm password"
                  type="password"
                  name="confirm"
                  autoComplete="new-password"
                  value={this.state.confirm}
                  onChange={this.onChange}
                  error={errors.confirm}
                />
                <button className="btn btn-info mt-4">Create an account</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth, errors }) => ({
  auth,
  errors,
});

const mapDispatchToProps = { registerUser, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
