import { Router } from 'express';
import { getProducts, postProduct, getProductById, putProductById, deleteProductById } from '../controllers/products.controllers.js';
import { passportCall, authorization } from "../utils.js";

const router = Router();

router.get("/", getProducts);

router.get('/:pid', getProductById);

router.post('/', passportCall('jwt'), authorization('admin'), postProduct);

router.put('/:pid', passportCall('jwt'), authorization('admin'), putProductById);

router.delete('/:pid', passportCall('jwt'), authorization('admin'), deleteProductById);

export default router;
