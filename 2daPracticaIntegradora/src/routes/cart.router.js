import { Router } from 'express';
import { postCart, getCartById, putCartById, putProductInCart, deleteCart, deleteProductInCart } from '../controllers/cart.controllers.js';

const router = Router();

// AGREGO UN CARRITO NUEVO
router.post('/', postCart);

// OBTENER SI EXISTE UN CARRITO PASANDO EL ID
router.get('/:cid', getCartById);

// AGREGO/ACTUALIZO CARRITO
router.put('/:cid', putCartById);

// AGREGO/ACTUALIZO PRODUCTO EN EL CARRITO
router.put('/:cid/product/:pid', putProductInCart);

/* // AGREGO/ACTUALIZO PRODUCTO EN EL CARRITO
router.post('/:cid/product/:pid', putProductInCart); */

// BORRA TODOS LOS PRODUCTOS DEL CARRO
router.delete('/:cid', deleteCart);

// BORRA UN PRODUCTO DEL CARRO
router.delete('/:cid/product/:pid', deleteProductInCart);

export default router;