import {ADD_AD, UPDATE_AD, DELETE_AD} from '../actions/actionTypes';

export default (state = [
    {
        id: -1,
        name: 'yeye',
        description: 'yoyo'
    }
], action) => {
    switch(action.type){
        case ADD_AD:
            return [
                ...state,
                {
                    id: action.payload.id,
                    name: action.payload.name,
                    description: action.payload.description
                }
            ]
        case UPDATE_AD:
            return state.map(v => {
                if(v.id === action.payload.id){
                    v.name = action.payload.name;
                    v.description = action.payload.description;
                }
                return v;
            })
        case DELETE_AD:
            return state.filter(v => v.id !== action.payload.id);
        default:
            return state;
    }
}