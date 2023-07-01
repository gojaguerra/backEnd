import { Router } from 'express';
import { getProducts, postProduct, getProductById, putProductById, deleteProductById } from '../controllers/products.controllers.js';

const router = Router();

router.get("/", getProducts);

router.get('/:pid', getProductById);

router.post('/', postProduct);

router.put('/:pid', putProductById);

router.delete('/:pid', deleteProductById);

export default router;
