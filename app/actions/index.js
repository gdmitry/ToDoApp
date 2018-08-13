import { ERROR, LOADING, FOLLOWERS_DATA, USERS_DATA } from  '../actionsTypes';
import { users } from '../mock.json'

export function getUsers(page, perPage){
    return (dispatch) => {
      dispatch({ type: LOADING, status: true })
      const url = 'https://api.github.com/users';
      callGithubAPI(url, page, perPage)
        .then(data => dispatch({ type: USERS_DATA, data }))
        .catch(e => dispatch({ type: ERROR, text: e.message }));
      // dispatch({ type: USERS_DATA, data: users })
    };
}

export function fetchUsers(page, perPage) {
    return (dispatch) => {
        const url = 'https://api.github.com/users';
        callGithubAPI(url, page, perPage)
            .then(data => dispatch({type: USERS_DATA, data}))
            .catch(e => dispatch({type: ERROR, text: e.message}));
        // dispatch({ type: USERS_DATA, data: users })
    };
}

export function getFollowers(login, page, perPage){
    return (dispatch) => {
      dispatch({ type: LOADING, status: true })
      const url = `https://api.github.com/users/${login}/followers`;
      callGithubAPI(url, page, perPage)
        .then(data => dispatch({ type: FOLLOWERS_DATA, data }))
        .catch(e => dispatch({ type: ERROR, text: e.message }));
    };
}