import { Router } from 'express';
import { chatRoute } from '../controllers/chat.controller.js';
import { authorization, passportCall } from '../utils.js';

const router = Router();

router.get('/', passportCall('jwt'), authorization('user'), chatRoute);

export default router;