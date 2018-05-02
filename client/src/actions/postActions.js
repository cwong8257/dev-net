import axios from 'axios';
import qs from 'qs';

import { ADD_POST, GET_ERRORS, POST_LOADING, GET_POSTS } from './types';

export const setPostLoading = () => ({
  type: POST_LOADING,
});

export const addPost = postData => async (dispatch) => {
  try {
    const response = await axios.post('/api/posts', qs.stringify(postData));

    dispatch({
      type: ADD_POST,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getPosts = () => async (dispatch) => {
  dispatch(setPostLoading());

  try {
    const response = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_POSTS,
      payload: null,
    });
  }
};
