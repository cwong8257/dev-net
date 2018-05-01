import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Navbar from '../components/layout/Navbar';
import Landing from '../components/layout/Landing';
import Footer from '../components/layout/Footer';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import Dashboard from '../components/dashboard/Dashboard';
import CreateProfile from '../components/create-profile/CreateProfile';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import '../App.css';

const AppRouter = () => (
  <BrowserRouter>
    <div className="App">
      <Navbar />
      <Switch>
        <PublicRoute exact path="/" component={Landing} />
      </Switch>
      <div className="container">
        <Switch>
          <PublicRoute exact path="/register" component={Register} />
        </Switch>
        <Switch>
          <PublicRoute exact path="/login" component={Login} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        </Switch>
      </div>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRouter;
