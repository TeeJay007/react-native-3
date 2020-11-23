import {createStore} from 'redux';
import rootReducer from './reducers';

import * as SQLite from 'expo-sqlite';



export default createStore(rootReducer, {
    ads: [{
        id: -2,
        name: 'yeyes',
        description: 'yoyo'
    }]
});