import React from 'react';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';

import store from './store';
import AppRouter from './router/AppRouter';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(clearCurrentProfile());
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default App;
