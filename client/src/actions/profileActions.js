import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';

export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE,
});

export const setProfileLoading = () => ({
  type: PROFILE_LOADING,
});

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
