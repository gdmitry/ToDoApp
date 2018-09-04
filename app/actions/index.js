import { NAVIGATE, FETCH_USERS, FETCH_FOLLOWERS } from  '../actionsTypes';

export function fetchUsers(page, perPage) {
    return (dispatch) => dispatch({type: FETCH_USERS, payload: { page, perPage }});
}

export function fetchFollowers(login, page, perPage) {
  return (dispatch) => dispatch({type: FETCH_FOLLOWERS, payload: { login, page, perPage }});
}

export function navigateToPage(page, data) {
  return (dispatch) => dispatch({type: NAVIGATE, payload: { page, data }});
}