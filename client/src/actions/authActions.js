import { TEST_DISPATCH } from './types';

export const registerUser = userData => ({
  type: TEST_DISPATCH,
  payload: userData,
});
