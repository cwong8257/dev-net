import axios from 'axios';
import qs from 'qs';

import { clearErrors, getErrors } from './errorActions';

import { GET_POST, ADD_POST, POST_LOADING, GET_POSTS, DELETE_POST } from './types';

export const setPostLoading = () => ({
  type: POST_LOADING,
});

export const getPost = postId => async (dispatch) => {
  dispatch(setPostLoading());
  dispatch(clearErrors());

  try {
    const response = await axios.get(`/api/posts/${postId}`);

    dispatch({
      type: GET_POST,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_POST,
      payload: null,
    });
  }
};

export const addPost = postData => async (dispatch) => {
  dispatch(clearErrors());

  try {
    const response = await axios.post('/api/posts', qs.stringify(postData));

    dispatch({
      type: ADD_POST,
      payload: response.data,
    });
  } catch (err) {
    dispatch(getErrors(err.response.data));
  }
};

export const deletePost = id => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (err) {
    dispatch(getErrors(err.response.data));
  }
};

export const getPosts = () => async (dispatch) => {
  dispatch(setPostLoading());
  dispatch(clearErrors());

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

export const addLike = postId => async (dispatch) => {
  try {
    await axios.post(`/api/posts/${postId}/like`);

    dispatch(getPost(postId));
    dispatch(getPosts());
  } catch (err) {
    dispatch(getErrors(err.response.data));
  }
};

export const removeLike = postId => async (dispatch) => {
  try {
    await axios.post(`/api/posts/${postId}/unlike`);

    dispatch(getPost(postId));
    dispatch(getPosts());
  } catch (err) {
    dispatch(getErrors(err.response.data));
  }
};

export const addComment = (postId, commentData) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    const response = await axios.post(`/api/posts/${postId}/comments`, qs.stringify(commentData));

    dispatch({
      type: GET_POST,
      payload: response.data,
    });
  } catch (err) {
    dispatch(getErrors(err.response.data));
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/posts/${postId}/comments/${commentId}`);

    dispatch({
      type: GET_POST,
      payload: response.data,
    });
  } catch (err) {
    dispatch(getErrors(err.response.data));
  }
};
