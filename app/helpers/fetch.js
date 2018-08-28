
export const callGithubAPI = function (url, since = 1, perPage = 1) {
    return fetch(`${url}?per_page=${perPage}&since=${since}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
};