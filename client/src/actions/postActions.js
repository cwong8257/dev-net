import axios from 'axios';
import qs from 'qs';

import { ADD_POST, GET_ERRORS } from './types';

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
