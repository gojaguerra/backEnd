import { Router } from 'express';
import CartManager from '../managers/cartManager.js';

const router = Router();
const cartManager = new CartManager('./files/carts.json');

router.get('/', (req, res) => {
    res.send({ carts })
});

router.post('/', async(req, res) => {
    const cart = req.body;
    
    //llamar al metodo addCart
    const result = await cartManager.addCart(cart)

    res.send({ status: 'success', result })//si salio todo ok lo guardo y muestro
});


export default router;