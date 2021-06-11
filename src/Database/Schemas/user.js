import Realm from 'realm';

/*
Customer name
Mobile-unique value
Email-unique value
isAssign - boolean(true/flase)
customerID - unique value
*/

export const UserSchema = {
    name: "Users",
    properties: {
        customerId: "int",
        customer_name: "string",
        mobile: "int",
        email: "string",
        isAssign: "bool",
    },
    primaryKey: "customerId",
};

export const databaseOptions = {
    path : 'users',
    schema : [UserSchema]
}

export default new Realm(databaseOptions);