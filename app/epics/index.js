import { combineEpics, ofType } from 'redux-observable';
import { callGithubAPI } from '../helpers/fetch';
import { USERS_DATA, FETCH_USERS, NAVIGATE, NAVIGATION_SUCCESS } from '../actionsTypes';
import { Actions } from 'react-native-router-flux';
import { from, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

function fetchUsersEpic(action$, state$) {
    const url = 'https://api.github.com/users';
    return action$.pipe(
        ofType(FETCH_USERS),
        // tap((x) => alert(JSON.stringify(state$.value.dataReducer))),
        mergeMap(({ payload: { page, perPage } }) => from(callGithubAPI(url, page, perPage))),
        map(data => ({ type: USERS_DATA, data }))
    );
}

function navigationEpic(action$, state$) {
  return action$.pipe(
    ofType(NAVIGATE),
    mergeMap(({ payload: { page, data } }) => {
      Actions[page](data);
      return of({ page, data });
    }),
    map(payload => ({ type: NAVIGATION_SUCCESS, page: payload.page, data: payload.data }))
  );
}

const rootEpic = combineEpics(
    fetchUsersEpic,
    navigationEpic
);

export default rootEpic;