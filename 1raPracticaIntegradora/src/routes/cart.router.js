import { Router } from 'express';
import ProductManager from "../dao/dbManagers/productManager.js"
import CartManager from "../dao/dbManagers/cartManager.js"

const router = Router();

const cartManager = new CartManager();
const productManager = new ProductManager();

// AGREGO UN CARRITO NUEVO
router.post('/', async(req, res) => {
    
    // Inicializo el carrito sin productos
    const cart = {
        products: []
    };

    try {
        const result = await cartManager.addCart(cart);
        res.send({ status: "success", payload: result})
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }

});

// OBTENER SI EXISTE UN CARRITO PASANDO EL ID
router.get('/:cid', async(req, res) => {
    const cartId = String(req.params.cid);
    try {
        const cart = await cartManager.getCartById(cartId);
        const response ={ status: "Success", payload: cart};
        //muestro resultado
        res.status(200).json(response);
    } catch (error) {
        const response = { status: "NOT FOUND", payload: `El carrito con ID ${cartId} NO existe!` };
        res.status(404).send(response);
    };
});

// AGREGO/ACTUALIZO PRODUCTO EN EL CARRITO
router.post('/:cid/product/:pid', async(req, res) => {
     //Leo el ID del carrito y producto por parametros 
    const cartId = String(req.params.cid);
    const productId = String(req.params.pid);

    //MongoDB
    // Primero Valido que exista el carrito 
    try {
        // OBTENGO el carrito QUE HAY EN la BASE
        await cartManager.getCartById(cartId);
    } catch (error) {
        const response = { status: "Error", payload: `El carrito con ID ${cartId} NO existe!` };
        return res.status(404).json(response);
    }
    // Segundo Valido que exista el producto
    try {
        // OBTENGO el producto QUE HAY EN la Base
        await productManager.getProductById(productId);
    } catch (error) {
        const response = { status: "Error", payload: `El Producto con ID ${productId} NO existe!` };
        return res.status(404).json(response);
    }

    // Una vez validado llamar al metodo addProductInCart
    try {
        const result = await cartManager.addProductInCart(cartId, productId);
        if(result.acknowledged) {
            res.status(200).send({ status: 'success', payload: 'Se agrego correctamente el producto al carrito' })
        };
    } catch (error) {
        res.status(404).send({ status: "NOT FOUND", payload: `No se pudo agregar el Producto al carrito!` });
    };

});

export default router;