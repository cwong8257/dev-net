import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route path="/" component={Landing} exact />
        <div className="container">
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
