import { combineReducers } from 'redux';
import { USERS_DATA, FOLLOWERS_DATA } from "../actions/" //Import the actions types constant we defined in our actions

let dataState = { users: [], followers: [], loading: true };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case USERS_DATA:
            state = { ...state, users: action.data, loading: false };
            return state;
        case FOLLOWERS_DATA:
            state = { ...state, followers: action.data, loading: false };
            return state;
        default:
            return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
})

export default rootReducer;