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

    res.send({ status: 'success', result })
});

router.get('/:id', async(req, res) => {
    const cartId = Number(req.params.id);
    const cart = await cartManager.getById(cartId);
    if (!cart) {
        return res.status(404).send({ error: 'cart not found' });
    }
    res.send({ status: ' success', cart });
})

export default router;