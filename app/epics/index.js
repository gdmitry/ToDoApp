import { combineEpics, ofType } from 'redux-observable';
import { Actions } from 'react-native-router-flux';
import { from, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import {
  USERS_DATA, FETCH_USERS, FOLLOWERS_DATA, FETCH_FOLLOWERS, NAVIGATE, NAVIGATION_SUCCESS
} from '../actionsTypes';
import { callGithubAPI } from '../helpers/fetch';
import { users } from '../mock.json';

function fetchUsersEpic(action$) {
  const url = 'https://api.github.com/users';
  return action$.pipe(
    ofType(FETCH_USERS),
    // tap((x) => alert(JSON.stringify(state$.value.dataReducer))),
    mergeMap(({ payload: { page, perPage } }) => from(callGithubAPI(url, page, perPage))),
    map(data => ({ type: USERS_DATA, data: users })),
  );
}

// function fetchFollowersEpic(action$, state$) {
function fetchFollowersEpic(action$) {
  return action$.pipe(
    ofType(FETCH_FOLLOWERS),
    // tap((x) => alert(JSON.stringify(state$.value.dataReducer))),
    mergeMap(({ payload: { login, page, perPage } }) => from(callGithubAPI(`https://api.github.com/users/${login}/followers`, page, perPage))),
    map(data => ({ type: FOLLOWERS_DATA, data: users })),
  );
}

function navigationEpic(action$) {
  return action$.pipe(
    ofType(NAVIGATE),
    mergeMap(({ payload: { page, data } }) => {
      Actions[page](data);
      return of({ page, data });
    }),
    map(payload => ({ type: NAVIGATION_SUCCESS, page: payload.page, data: payload.data })),
  );
}

const rootEpic = combineEpics(
  fetchUsersEpic,
  navigationEpic,
  fetchFollowersEpic,
);

export default rootEpic;
