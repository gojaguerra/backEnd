import { Router } from 'express';
import { changeRol, uploadFile } from '../controllers/user.controller.js';
import { uploader } from '../utils/utils.js';

const router = Router();

router.post('/premium/:uid', changeRol);

router.post('/:uid/documents', uploader.array('file'), uploadFile);

export default router;