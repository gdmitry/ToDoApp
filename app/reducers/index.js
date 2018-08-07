import { combineReducers } from 'redux';
import { ERROR, LOADING, FOLLOWERS_DATA, USERS_DATA } from  '../actionsTypes';

let dataState = { users: [], followers: [], loading: true, error: null };

const dataReducer = (state = dataState, action) => {
    switch (action.type) { 
        case ERROR:             
            state = { ...state, error: action.text };
            return state;
        case LOADING:             
            state = { ...state, loading: !!action.status };
            return state;
        case USERS_DATA:
            state = { ...state, users: action.data, loading: false, error: action.data.message ? action.data.message : null };
            return state;
        case FOLLOWERS_DATA:
            state = { ...state, followers: action.data, loading: false, error: action.data.message ? action.data.message : null };
            return state;
        default:
            return state;
    } 
};

const rootReducer = combineReducers({
    dataReducer
})

export default rootReducer;