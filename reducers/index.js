import {combineReducers} from 'redux';
import ads from './adReducer';
import user from './userReducer';
export default combineReducers({ads, user});