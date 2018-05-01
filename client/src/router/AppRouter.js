import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from '../components/layout/Navbar';
import Landing from '../components/layout/Landing';
import Footer from '../components/layout/Footer';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import Dashboard from '../components/dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';

import '../App.css';

const AppRouter = () => (
  <BrowserRouter>
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Landing} />
      <div className="container">
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRouter;
