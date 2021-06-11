import Realm from 'realm';
import {databaseOptions} from "../Schemas/user";

export const addUser = userData => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(()=>{
            let userList = realm.objects('Users');
            let isUserExist = userList.filter(item => item.email == userData.email || item.mobile == userData.mobile)
            if(isUserExist.length > 0){
                reject("ERROR : User with email/password already exist")
            }else{
                realm.create('Users', userData);
                resolve(userData);
            }
        })
    }).catch(e => reject(e));
})

export const updateUser = userData => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(()=>{
            let updatingUserData = realm.objectForPrimaryKey('Users', userData.customerId);
            updatingUserData.isAssign = !userData.isAssign;
            resolve();
        })
    }).catch(e => reject(e));
})

export const deleteUser = userId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(()=>{
            let res = realm.objectForPrimaryKey('Users', userId);
            realm.delete(res);
            resolve();
        })
    }).catch(e => reject(e));
})

export const getUsers = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(()=>{
            let userList = realm.objects('Users');
            resolve(userList);
        })
    }).catch(e => reject(e));
})