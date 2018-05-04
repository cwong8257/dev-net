import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from '../components/layout/Navbar';
import Landing from '../components/layout/Landing';
import Footer from '../components/layout/Footer';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import Dashboard from '../components/dashboard/Dashboard';
import CreateProfile from '../components/create-profile/CreateProfile';
import EditProfile from '../components/edit-profile/EditProfile';
import AddExperience from '../components/add-credentials/AddExperience';
import AddEducation from '../components/add-credentials/AddEducation';
import NotFound from '../components/not-found/NotFound';
import Profiles from '../components/profiles/Profiles';
import Profile from '../components/profile/Profile';
import Posts from '../components/posts/Posts';
import Post from '../components/post/Post';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import '../App.css';

const AppRouter = () => (
  <BrowserRouter>
    <div className="App bg-light">
      <Navbar />
      <Switch>
        <PublicRoute exact path="/" component={Landing} />
      </Switch>
      <div className="container">
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:handle" component={Profile} />
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
        <Switch>
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/add-experience" component={AddExperience} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/add-education" component={AddEducation} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/feed" component={Posts} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/post/:postId" component={Post} />
        </Switch>
        <Route exact path="/not-found" component={NotFound} />
      </div>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRouter;
