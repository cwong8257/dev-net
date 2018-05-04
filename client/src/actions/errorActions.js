import { CLEAR_ERRORS, GET_ERRORS } from './types';

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

export const getErrors = error => ({
  type: GET_ERRORS,
  payload: error,
});
