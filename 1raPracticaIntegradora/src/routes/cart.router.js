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
router.get('/:id', async(req, res) => {
    const cartId = Number(req.params.id);
    try {
        const cart = await cartManager.getCartById(cartId);
   
         //Valido el resultado de la búsqueda
        const response = cart!==-1
            ? { status: "Success", data: cart} 
            : { status: "NOT FOUND", data: `El carrito con ID ${cartId} NO existe!` };

        const statusCode = cart!==-1 ? 200 : 404;

        //muestro resultado
        res.status(statusCode).json(response);
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
});

// AGREGO/ACTUALIZO PRODUCTO EN EL CARRITO
router.post('/:cid/product/:pid', async(req, res) => {
    // Primero Valido que exista el carrito 
    /* const cartId = Number(req.params.cid); */
    const cartId = req.params.cid;
    // OBTENGO el carrito QUE HAY EN EL ARCHIVO
    const cart = await cartManager.getCartById(cartId);
    //Valido el resultado de la búsqueda
    if (cart === -1){
        const response = { status: "Error", data: `El carrito con ID ${cartId} NO existe!` };
        return res.status(404).json(response);
    };
    // Segundo Valido que exista el producto
    const productId = req.params.pid;
    // OBTENGO el carrito QUE HAY EN EL ARCHIVO
    const product = await productManager.getProductById(productId);

    /* console.log(product); */
    if (product === -1){
        const response = { status: "Error", data: `El Producto con ID ${productId} NO existe!` };
        return res.status(404).json(response);
    };
    /* console.log(cart[0]._id);
    console.log(product[0]._id); */
    // Una vez validado llamar al metodo addProductInCart
    try {
        const result = await cartManager.addProductInCart(cartId, productId);
        console.log(result);
        if(result) {
            res.send({ status: 'success', result: 'Se agrego correctamente el producto al carrito' })
        };
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
    /* console.log(result); */

});

export default router;