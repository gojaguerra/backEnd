import { userModel } from "../models/users.Model.js";
// import { postRegister, postLogin, getLogout, getPassportCall } from '../controllers/sessions.controller.js'
// import { generateToken, passportCall, createHash, isValidPassword } from '../../utils.js';

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
};