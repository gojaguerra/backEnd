import { Router } from 'express';
import { passportCall } from '../utils.js';
import { iniRaiz, loginRaiz, profileRaiz, regRaiz, resetRaiz } from '../controllers/viewsRouter.controller.js';

const router = Router();

router.get('/register', regRaiz);

router.get('/login', loginRaiz);

router.get('/resetPassword', resetRaiz);

router.get('/', passportCall('jwt'), iniRaiz);

router.get('/profile', passportCall('jwt'), profileRaiz);

export default router;