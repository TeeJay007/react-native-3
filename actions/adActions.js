import {ADD_AD, UPDATE_AD, DELETE_AD} from './actionTypes';

//let nextAdId = 99;

export const addAd = (name, description, id = undefined, user = undefined) => ({
    type: ADD_AD,
    payload: {
        id,
        name,
        description,
        user
    }
});

export const updateAd = (id, name, description) => ({
    type: UPDATE_AD,
    payload: {
        id,
        name,
        description
    }
});

export const deleteAd = id => ({
    type: DELETE_AD,
    payload: { id }
});