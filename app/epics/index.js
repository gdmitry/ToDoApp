import { merge } from 'rxjs/observable/merge'
import { callGithubAPI } from '../helpers/fetch';
import { USERS_DATA, FETCH_USERS } from '../actionsTypes';
import Rx from 'rxjs'

function fetchUsersEpic(action$) {
    const url = 'https://api.github.com/users';
    return action$
      .ofType(FETCH_USERS)
      // .do(() => alert('here'))
        .mergeMap(({ payload: { page, perPage } }) => Rx.Observable.fromPromise( callGithubAPI(url, page, perPage)))
        .mapTo((data) => Rx.Observable.of({ type: USERS_DATA, data }));
}

export default (action$, store) => merge(
    fetchUsersEpic(action$, store)
);