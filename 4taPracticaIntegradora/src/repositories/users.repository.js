import UsersDao from '../dao/dbManagers/user.Manager.js';

export default class UsersRepository {
    constructor() {
        this.dao = new UsersDao();
    };

    getUser = async (email) => {
        const result = await this.dao.getUser(email);
        return result;
    };

    getUserById = async (id) => {
        const result = await this.dao.getUserById(id);
        return result; 
    };
    
    addUser = async (user) => {
        const result = await this.dao.addUser(user);
        return result;
    };

    updateUser = async (id, user) => {
        const result = await this.dao.updateUser(id, user);
        return result;
    }

    updateUserPush = async (id, user) => {
        const result = await this.dao.updateUserPush(id, user);
        return result;
    }

};