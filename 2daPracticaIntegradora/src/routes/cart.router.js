import { Router } from 'express';
import { postCart, getCartById, putCartById, putProductInCart, deleteCart, deleteProductInCart } from '../controllers/cart.controllers.js';
import { passportCall, authorization } from "../utils.js";

const router = Router();

// AGREGO UN CARRITO NUEVO
router.post('/', passportCall('jwt'), authorization('user'), postCart);

// OBTENER SI EXISTE UN CARRITO PASANDO EL ID
router.get('/:cid', getCartById);

// AGREGO/ACTUALIZO CARRITO
router.put('/:cid', passportCall('jwt'), authorization('user'), putCartById);

// AGREGO/ACTUALIZO PRODUCTO EN EL CARRITO
router.put('/:cid/product/:pid', passportCall('jwt'), authorization('user'), putProductInCart);

/* // AGREGO/ACTUALIZO PRODUCTO EN EL CARRITO
router.post('/:cid/product/:pid', putProductInCart); */

// BORRA TODOS LOS PRODUCTOS DEL CARRO
router.delete('/:cid', passportCall('jwt'), authorization('user'), deleteCart);

// BORRA UN PRODUCTO DEL CARRO
router.delete('/:cid/product/:pid', passportCall('jwt'), authorization('user'), deleteProductInCart);

export default router;