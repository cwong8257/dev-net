import {
  CLEAR_CURRENT_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  PROFILE_NOT_LOADING,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        profile: null,
        loading: true,
      };
    case PROFILE_NOT_LOADING:
      return {
        ...state,
        loading: false,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
};
