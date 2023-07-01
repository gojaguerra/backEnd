import { Router } from 'express';
import { registerUser, loginUser, logoutUser, gitUser, gitCallbackUser, currentUser } from '../controllers/user.controller.js'
import { generateToken, passportCall, createHash, isValidPassword } from '../utils.js';
// import passport from 'passport';
// import { responseMessages } from '../helpers/proyect.helpers.js';
//import userModel from "../dao/models/users.Model.js";

const router = Router();

router.route('/register')
    .post(registerUser);

router.route('/login')
    .post(loginUser);

router.route('/logout')
    .get(logoutUser);

router.route('/github')
    .get(passportCall('github', { scope: ['user:email']}), gitUser);

router.route('/github-callback')
    .get(passportCall('github', { failureRedirect: '/login' }), gitCallbackUser);    

router.route('/current')
    .get(passportCall('jwt'), currentUser);

export default router;