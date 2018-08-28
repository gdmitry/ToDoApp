import { combineEpics, ofType } from 'redux-observable';
import { callGithubAPI } from '../helpers/fetch';
import { USERS_DATA, FETCH_USERS } from '../actionsTypes';
import { from, of } from 'rxjs';
import { map, filter, switchMap, mergeMap, mapTo, tap, flatMap } from 'rxjs/operators';

function fetchUsersEpic(action$, state$) {
    const url = 'https://api.github.com/users';

    return action$.pipe(
        ofType(FETCH_USERS),
        // tap((x) => alert(JSON.stringify(state$.value.dataReducer))),
        mergeMap(({ payload: { page, perPage } }) => from(callGithubAPI(url, page, perPage))),
        map(data => ({ type: USERS_DATA, data }))
    );
}

const rootEpic = combineEpics(
    fetchUsersEpic
);

export default rootEpic;