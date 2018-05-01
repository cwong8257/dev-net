import axios from 'axios';
import qs from 'qs';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
} from './types';

export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE,
});

export const setProfileLoading = () => ({
  type: PROFILE_LOADING,
});

export const createProfile = (profileData, history) => async (dispatch) => {
  try {
    await axios.post('/api/profile', qs.stringify(profileData));
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getCurrentProfile = () => async (dispatch) => {
  try {
    dispatch(setProfileLoading());
    const response = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILE,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: {},
    });
  }
};

export const deleteAccount = () => async (dispatch) => {
  try {
    await axios.delete('/api/profile');
    dispatch({
      type: SET_CURRENT_USER,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
