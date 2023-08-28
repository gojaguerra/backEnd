import { Router } from 'express';
import { changeRol, uploadFile } from '../controllers/user.controller.js';
import { uploader, verifyUserStatus } from '../utils/utils.js';

const router = Router();

router.post('/premium/:uid', verifyUserStatus, changeRol);

/* router.post('/:uid/documents', uploader.array('file'), uploadFile); */

router.post('/:uid/documents', uploader.fields([
        {name: 'profiles', maxCount: 1}, 
        {name: 'products', maxCount: 1},
        {name: 'documents', maxCount: 3}]), uploadFile);

export default router;