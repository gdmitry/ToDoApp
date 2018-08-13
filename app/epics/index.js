import { combineEpics } from 'redux-observable';
import { callGithubAPI } from '../helpers/fetch';

function fetchUsersEpic(action$) {
    const url = 'https://api.github.com/users';

    return action$.ofType('FETCH_USERS')
        .mergeMap(({ payload: { page, perPage } }) =>
            Observable.fromPromise( callGithubAPI(url, page, perPage)))
        .mapTo(() => Observable.of({ type: 'SUCCESS' }))
}

export default combineEpics(
    fetchUsersEpic
);