import { Router } from 'express';
import { changeRol } from '../controllers/user.controller.js';

const router = Router();

router.post('/premium/:uid', changeRol);

export default router;