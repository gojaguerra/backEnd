import { Router } from 'express';
import { chatRoute } from '../controllers/chat.controller.js';

const router = Router();

router.get('/', chatRoute);

export default router;