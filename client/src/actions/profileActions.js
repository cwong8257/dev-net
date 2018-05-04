import axios from 'axios';
import qs from 'qs';

import { clearErrors, getErrors } from './errorActions';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_PROFILES,
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
    dispatch(getErrors(err.response.data));
  }
};

export const getCurrentProfile = () => async (dispatch) => {
  dispatch(clearErrors());

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

export const getProfileByHandle = handle => async (dispatch) => {
  try {
    dispatch(setProfileLoading());
    const response = await axios.get(`/api/profile/handle/${handle}`);
    dispatch({
      type: GET_PROFILE,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: null,
    });
  }
};

export const getProfiles = () => async (dispatch) => {
  try {
    dispatch(setProfileLoading());
    const response = await axios.get('/api/profile/all');
    dispatch({
      type: GET_PROFILES,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILES,
      payload: {},
    });
  }
};

export const addExperience = (experienceData, history) => async (dispatch) => {
  try {
    await axios.post('/api/profile/experience', qs.stringify(experienceData));
    history.push('/dashboard');
  } catch (err) {
    dispatch(getErrors(err.response.data));
  }
};

export const addEducation = (educationData, history) => async (dispatch) => {
  try {
    await axios.post('/api/profile/education', qs.stringify(educationData));
    history.push('/dashboard');
  } catch (err) {
    dispatch(getErrors(err.response.data));
  }
};

export const deleteExperience = experienceId => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/profile/experience/${experienceId}`);
    dispatch({
      type: GET_PROFILE,
      payload: response.data,
    });
  } catch (err) {
    dispatch(getErrors(err.response.data));
  }
};

export const deleteEducation = educationId => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/profile/education/${educationId}`);
    dispatch({
      type: GET_PROFILE,
      payload: response.data,
    });
  } catch (err) {
    dispatch(getErrors(err.response.data));
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
    dispatch(getErrors(err.response.data));
  }
};
