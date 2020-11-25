import {LOGIN_USER} from './actionTypes';


export const loginUser = (name) => ({
    type: LOGIN_USER,
    payload: {
        name,
    }
});