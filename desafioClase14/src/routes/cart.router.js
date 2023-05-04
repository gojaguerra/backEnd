import { Router } from 'express';
import CartManager from '../managers/cartManager.js';
import ProductManager from '../managers/productManager.js';

const router = Router();

const cartManager = new CartManager('./files/carts.json');
const productManager = new ProductManager('./files/products.json');


/* router.get('/', (req, res) => {
    res.send({ carts })
}); */

// AGREGO UN CARRITO NUEVO
router.post('/', async(req, res) => {
    //const cart = req.body;
    
    // Inicializo el carrito sin productos
    const cart = {
        products: []
    };
    //llamar al metodo addCart
    const result = await cartManager.addCart(cart)

    res.send({ status: 'success', result })
});

// OBTENER SI EXISTE UN CARRITO PASANDO EL ID
router.get('/:id', async(req, res) => {
    const cartId = Number(req.params.id);
    const cart = await cartManager.getCartById(cartId);
   
    //Valido el resultado de la búsqueda
        const response = cart!==-1
            ? { status: "Success", data: cart} 
            : { status: "NOT FOUND", data: `El carrito con ID ${cartId} NO existe!` };

        const statusCode = cart!==-1 ? 200 : 404;

        //muestro resultado
        res.status(statusCode).json(response);
});

// AGREGO/ACTUALIZO PRODUCTO EN EL CARRITO
router.post('/:cid/product/:pid', async(req, res) => {
    // Primero Valido que exista el carrito 
    const cartId = Number(req.params.cid);
    // OBTENGO el carrito QUE HAY EN EL ARCHIVO
    const cart = await cartManager.getCartById(cartId);
    //Valido el resultado de la búsqueda
    if (cart === -1){
        const response = { status: "Error", data: `El carrito con ID ${cartId} NO existe!` };
        return res.status(404).json(response);
    };
    // Segundo Valido que exista el producto
    const productId = Number(req.params.pid);
    // OBTENGO el carrito QUE HAY EN EL ARCHIVO
    const product = await productManager.getProductById(productId);
    if (product === -1){
        const response = { status: "Error", data: `El Producto con ID ${productId} NO existe!` };
        return res.status(404).json(response);
    };

    // Una vez validado llamar al metodo addProductInCart
    const result = await cartManager.addProductInCart(cart.id, product.id);

    res.send({ status: 'success', result: 'Se agrego correctamente el producto al carrito' })

});

export default router;