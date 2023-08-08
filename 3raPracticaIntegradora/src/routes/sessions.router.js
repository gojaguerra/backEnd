import { Router } from 'express';
import { registerUser, loginUser, logoutUser, gitUser, gitCallbackUser, currentUser, passLink, linkPass, changePassword, changeRol } from '../controllers/user.controller.js';
import { authTokenResetPass, passportCall } from '../utils.js';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

router.post('/password-link', passLink);

router.post('/password-change/', passportCall('jwt'), changePassword);

router.get('/linkPassword', authTokenResetPass, linkPass);

router.get('/github', passportCall('github', { scope: ['user:email']}), gitUser);

router.get('/github-callback', passportCall('github', { failureRedirect: '/login' }), gitCallbackUser);    

router.get('/current', passportCall('jwt'), currentUser);

router.post('/premium/:uid', changeRol);

export default router;