import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from '../components/layout/Navbar';
import Landing from '../components/layout/Landing';
import Footer from '../components/layout/Footer';
import Register from '../components/pages/Register';
import Login from '../components/pages/Login';
import Dashboard from '../components/pages/Dashboard';
import CreateProfile from '../components/pages/CreateProfile';
import EditProfile from '../components/pages/EditProfile';
import AddExperience from '../components/pages/AddExperience';
import AddEducation from '../components/pages/AddEducation';
import NotFound from '../components/pages/NotFound';
import Profiles from '../components/pages/Profiles/';
import Profile from '../components/pages/Profile/';
import Posts from '../components/pages/Posts';
import Post from '../components/pages/Post';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import '../App.css';

const AppRouter = () => (
  <BrowserRouter>
    <div className="App">
      <Navbar />
      <Switch>
        <PublicRoute exact path="/" component={Landing} />
        <PublicRoute exact path="/register" component={Register} />
        <PublicRoute exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:handle" component={Profile} />
        <Route exact path="/profile/user/:userId" component={Profile} />
        <Route exact path="/not-found" component={NotFound} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/feed" component={Posts} />
        <PrivateRoute exact path="/post/:postId" component={Post} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRouter;
