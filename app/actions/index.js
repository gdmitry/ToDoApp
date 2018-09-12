import { NAVIGATE, FETCH_USERS, FETCH_FOLLOWERS } from '../actionsTypes';

export function fetchUsers(page, perPage) {
  return { type: FETCH_USERS, payload: { page, perPage } };
}

export function fetchFollowers(login, page, perPage) {
  return { type: FETCH_FOLLOWERS, payload: { login, page, perPage } };
}

export function navigateToPage(page, data) {
  return { type: NAVIGATE, payload: { page, data } };
}
