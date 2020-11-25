import * as SQLite from 'expo-sqlite';
import {ADD_AD, UPDATE_AD, DELETE_AD} from './actions/actionTypes';
import { addAd } from './actions/adActions';


const db = SQLite.openDatabase("ads.db");

const dbQueryHelper = (query, params = null) => (
    new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, params, (_, resultset) => {
                resolve(resultset);
            }, (_, err) => {
                console.error(err);
                reject(err);
            })
        })
    })
)

const initDB = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`create table if not exists ads (
                id integer primary key autoincrement,
                name text,
                description text,
                user string
            );`);
            //tx.executeSql(`drop table ads`);
        }, (err) => {
            console.error(err);
            reject(err);
        }, () => resolve(true))
    });
}

export async function getAllAdsFromDB(){
    await initDB();
    return (await dbQueryHelper(`select * from ads`)).rows['_array'];
}
//*-----------------------------------------------
const insertAdToDB = (adObject) => {
    return dbQueryHelper(`insert into ads (name, description, user) values (?, ?, ?)`, [
        adObject.name, adObject.description, adObject.user
    ]);
}

const updateDBAd = (adObject) => {
    return dbQueryHelper(`update ads set name = ?, description = ? where id = ?`, [
        adObject.name, adObject.description, adObject.id
    ]);
}

const deleteDBAd = (adObject) => {
    return dbQueryHelper(`delete from ads where id = ?`, [
        adObject.id
    ]);
}
//*-----------------------------------------------

const insertUserToDB = (userObject) => {
    return dbQueryHelper(`insert or replace into ads (name) values (?)`, [
        userObject.name
    ]);
}

const handleAction = async (action) => {
    switch(action.type){
        case ADD_AD:
            if(action.payload.id == undefined)
                if(!await insertAdToDB(action.payload).then(v => action.payload.id = v.insertId, false))
                    return false;
            break;
        case UPDATE_AD:
            if(!await updateDBAd(action.payload).then(v => (v.rowsAffected > 0), false))
                return false;
            break;
        case DELETE_AD:
            if(!await deleteDBAd(action.payload).then(v => (v.rowsAffected > 0), false))
                return false;
            break;
        break;
    }
    return true;
}

export function dbMiddleware({dispatch, getState}){
    getAllAdsFromDB().then(v => v.map(ad => {dispatch(addAd(ad.name, ad.description, ad.id, ad.user))}));

    return next => async action => {
        if(await handleAction(action)){
            return next(action);
        }
    }
}