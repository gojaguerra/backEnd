import UsersRepository from '../repositories/users.repository.js';

const usersRepository = new UsersRepository();

const getUser = async (email) => {
    const user = await usersRepository.getUser(email);
    return user;
};

const getUserById = async (id) => {
    const user = await usersRepository.getUserById(id);
    return user;
};

const addUser = async (user) => {
    const result = await usersRepository.addUser(user);
    return result;
};

const updateUser = async (id, user) => {
    const result = await usersRepository.updateUser(id, user);
    return result;
};

const updateUserPush = async (id, user) => {
    const result = await usersRepository.updateUserPush(id, user);
    return result;
};

export {
    getUser,
    getUserById,
    addUser,
    updateUser,
    updateUserPush
}