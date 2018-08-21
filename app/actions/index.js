import { ERROR, LOADING, FOLLOWERS_DATA, USERS_DATA, FETCH_USERS, FETCH_FOLLOWERS } from  '../actionsTypes';
import { users } from '../mock.json'

export function fetchUsers(page, perPage) {
    return (dispatch) => dispatch({type: FETCH_USERS, data: { page, perPage }});
}

export function fetchFollowers(page, perPage) {
  return (dispatch) => dispatch({type: FETCH_FOLLOWERS, data: { page, perPage }});
}