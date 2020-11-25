import {LOGIN_USER} from '../actions/actionTypes';

export default (state = (
    {
        name: '',
    }
), action) => {
    switch(action.type){
        case LOGIN_USER:
            return (
                {
                    name: action.payload.name,
                }
            )
        default:
            return state;
    }
}