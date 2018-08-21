import { combineEpics } from 'redux-observable';
import { callGithubAPI } from '../helpers/fetch';
import { USERS_DATA, FETCH_USERS } from '../actionsTypes';
import { from, of } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

function fetchUsersEpic(action$) {
    const url = 'https://api.github.com/users';

    return action$
      .ofType(FETCH_USERS)
      .do(() => alert('here'))
        .mergeMap(({ payload: { page, perPage } }) => from( callGithubAPI(url, page, perPage)))
        .mapTo((data) => of({ type: USERS_DATA, data }));
}

const rootEpic = combineEpics(
    fetchUsersEpic
);

export default rootEpic;