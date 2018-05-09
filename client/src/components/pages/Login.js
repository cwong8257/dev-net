import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import { loginUser } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class Login extends Component {
  static getDerivedStateFromProps = ({ errors }) => ({ errors });

  state = {
    email: '',
    password: '',
    errors: '',
  };

  componentDidMount = () => {
    document.title = 'Sign in to DevNet | DevNet';
    this.props.clearErrors();
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const userData = { email, password };
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <h1 className="display-4 text-center">Sign in</h1>
            <p className="text-center mb-4">Sign in to DevNet</p>
            <div className="row mb-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <form noValidate onSubmit={this.onSubmit}>
                      <TextFieldGroup
                        label="Email address"
                        type="email"
                        name="email"
                        autoComplete="username email"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                      />
                      <TextFieldGroup
                        label="Password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={this.onChange}
                        error={errors.password}
                      />
                      <button className="btn btn-info btn-block mt-4">Sign in</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    New to DevNet? <Link to="/register">Create an account</Link>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = ({ errors }) => ({
  errors,
});

const mapDispatchToProps = { loginUser, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
