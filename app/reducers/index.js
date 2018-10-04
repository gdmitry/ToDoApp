import { combineReducers } from 'redux';
import {
  ERROR, LOADING, FETCH_USERS, FOLLOWERS_DATA, FETCH_FOLLOWERS, USERS_DATA
} from '../actionsTypes';

const dataState = {
  users: [], followers: [], loading: false, error: null
};

const dataReducer = (stateObj = dataState, action) => {
  let state = stateObj;
  switch (action.type) {
    case FETCH_USERS:
    case FETCH_FOLLOWERS:
      state = { ...state, loading: true };
      return state;
    case ERROR:
      state = { ...state, error: action.text };
      return state;
    case LOADING:
      state = { ...state, loading: !!action.status };
      return state;
    case USERS_DATA:
      state = {
        ...state,
        users: action.data,
        loading: false,
        error: action.data.message ? action.data.message : null
      };
      return state;
    case FOLLOWERS_DATA:
      state = {
        ...state,
        followers: action.data,
        loading: false,
        error: action.data.message ? action.data.message : null
      };
      return state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  dataReducer
});

export default rootReducer;
