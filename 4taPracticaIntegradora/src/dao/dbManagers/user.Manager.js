import { userModel } from "../models/users.Model.js";

export default class UserManager {

    constructor() {
        console.log('Working user with DB');
    };

    addUser = async (user) => {
        const result = await userModel.create(user);
        return result;
    }

    getUser = async (email) => {
        const user = await userModel.findOne( email );
        return user;
    }

    getUserById = async (id) => {
        const user = await userModel.findOne( id );
        return user; 
    };

    updateUser = async (id, user) => {
        const result = await userModel.updateOne({_id: id}, { $set: user });
        return result;
    };

    updateUserPush = async (id, user) => {
        const result = await userModel.updateOne({_id: id}, {$push: { documents: user}});
        return result;
    };

};