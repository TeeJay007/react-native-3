import {ADD_AD, UPDATE_AD, DELETE_AD} from './actionTypes';

let nextAdId = 0;

export const addAd = (name, description) => ({
    type: ADD_AD,
    payload: {
        id: ++nextAdId,
        name,
        description
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