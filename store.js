import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers';
import {dbMiddleware} from './sqliteMiddleware';

export default createStore(rootReducer, undefined, applyMiddleware(dbMiddleware));