import { 
    postCart as postCartService,
    getCartById as getCartByIdService, 
    putCartById as putCartByIdService,
    deleteAllProductsInCart as deleteAllProductsInCartService,  
    putProductInCart as putProductInCartService,
    deleteProductInCart as deleteProductInCartService, 
    postPurchase as postPurchaseService
} from '../services/carts.services.js';

import { 
    getProductById as getProductByIdService, 
    stockProduct as stockProductService
} from "../services/products.services.js";


// AGREGO UN CARRITO NUEVO
// router.post('/', async(req, res) => {
const postCart = async(req, res) => {
    
    // Inicializo el carrito sin productos
    const cart = {
        products: []
    };

    try {
        const result = await postCartService(cart);
        res.send({ status: "success", payload: result})
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }

};

// OBTENER SI EXISTE UN CARRITO PASANDO EL ID
// router.get('/:cid', async(req, res) => {
const getCartById = async(req, res) => {
    const cartId = String(req.params.cid);
    try {
        const cart = await getCartByIdService(cartId);
        const response ={ status: "Success", payload: cart};
        //muestro resultado
        // VISTA DEL CARRITO
        cart[0].isValid= cart[0].products.length > 0
        // res.status(200).json(response);
        res.render("carts.handlebars", cart[0] );
    } catch (error) {
        const response = { status: "NOT FOUND", payload: `El carrito con ID ${cartId} NO existe!` };
        res.status(404).send(response);
    };
};

// AGREGO/ACTUALIZO PRODUCTO EN EL CARRITO
// router.put('/:cid', async(req, res) => {
const putCartById = async(req, res) => {
    //Leo el ID del carrito y producto por parametros 
    const cartId = String(req.params.cid);
    const { productId, quantity } = req.body;
    //MongoDB
    // Primero Valido que exista el carrito 
    try {
        // OBTENGO el carrito QUE HAY EN la BASE
        await getCartByIdService(cartId);
    } catch (error) {
        const response = { status: "Error", payload: `El carrito con ID ${cartId} NO existe!` };
        return res.status(404).json(response);
    }
    // Segundo Valido que exista el producto
    try {
        // OBTENGO el producto QUE HAY EN la Base
        await getProductByIdService(productId);
    } catch (error) {
        const response = { status: "Error", payload: `El Producto con ID ${productId} NO existe!` };
        return res.status(404).json(response);
    }
    // Una vez validado llamar al metodo addProductInCart
    try {
        const result = await putCartByIdService(cartId, productId, quantity);
        console.log("router: " + JSON.stringify(result, null, '\t'));
        if(result.acknowledged) {
            res.status(200).send({ status: 'success', payload: 'Se agrego correctamente el producto al carrito' })
        };
    } catch (error) {
        res.status(404).send({ status: "NOT FOUND", payload: `No se pudo agregar el Producto al carrito!` });
    };
};

const deleteAllProductsInCart = async(req, res) => {
    const cartId = String(req.params.cid);
    try {
        const cart = await deleteAllProductsInCartService(cartId);
        const response ={ status: "Success", payload: cart};
        //muestro resultado
        res.status(200).json(response);
    } catch (error) {
        const response = { status: "NOT FOUND", payload: `El carrito con ID ${cartId} NO existe!` };
        res.status(404).send(response);
    };
};

// AGREGO/ACTUALIZO PRODUCTO EN EL CARRITO
// router.put('/:cid/product/:pid', async(req, res) => {
const putProductInCart = async(req, res) => {
    //Leo el ID del carrito y producto por parametros 
    const cartId = String(req.params.cid);
    const productId = String(req.params.pid);
    const { quantity } = req.body;
    //MongoDB
    // Primero Valido que exista el carrito 
    try {
        // OBTENGO el carrito QUE HAY EN la BASE
        await getCartByIdService(cartId);
    } catch (error) {
        const response = { status: "Error", payload: `El carrito con ID ${cartId} NO existe!` };
        return res.status(404).json(response);
    }
    // Segundo Valido que exista el producto
    try {
        // OBTENGO el producto QUE HAY EN la Base
        await getProductByIdService(productId);
    } catch (error) {
        const response = { status: "Error", payload: `El Producto con ID ${productId} NO existe!` };
        return res.status(404).json(response);
    }
    // Una vez validado llamar al metodo addProductInCart
    try {
        const result = await putProductInCartService(cartId, productId, quantity);
        console.log("router: " + JSON.stringify(result, null, '\t'));
        if(result.acknowledged) {
            res.status(200).send({ status: 'success', payload: 'Se actualizo correctamente el producto al carrito' })
        };
    } catch (error) {
        res.status(404).send({ status: "NOT FOUND", payload: `No se pudo actualizar el Producto al carrito!` });
    };
};

/* // AGREGO/ACTUALIZO PRODUCTO EN EL CARRITO
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

}); */

// BORRA TODOS LOS PRODUCTOS DEL CARRO
// router.delete('/:cid', async(req, res) => {
const deleteCart = async(req, res) => {
    const cartId = String(req.params.cid);
    try {
        const cart = await deleteCartService(cartId);
        const response ={ status: "Success", payload: cart};
        //muestro resultado
        res.status(200).json(response);
    } catch (error) {
        const response = { status: "NOT FOUND", payload: `El carrito con ID ${cartId} NO existe!` };
        res.status(404).send(response);
    };
};

// BORRA UN PRODUCTO DEL CARRO
// router.delete('/:cid/product/:pid', async(req, res) => {
const deleteProductInCart = async(req, res) => {
    const cartId = String(req.params.cid);
    const productId = String(req.params.pid);
    try {
        const cart = await deleteProductInCartService(cartId,productId);
        const response ={ status: "Success", payload: cart};
        //muestro resultado
        res.status(200).json(response);
    } catch (error) {
        const response = { status: "NOT FOUND", payload: `El carrito con ID ${cartId} NO existe!` };
        res.status(404).send(response);
    };
};

const postPurchase = async(req, res) => {
    //Leo el ID del carrito y producto por parametros 
    console.log("1 INGRESO AL PROCESO DE COMPRA");
    const cartId = String(req.params.cid);
    //const userMail = req.user.email;
    const userMail = "gojaguerra@gmail.com";
    console.log("2 Leo parametros "  + cartId + " " + userMail);
    // Primero Valido que exista el carrito 
    try {
        const newCart = [];
        const noCart = [];
        // OBTENGO el carrito QUE HAY EN la BASE
        console.log("3 VALIDO CARRITO");
        const cartPuchase = await getCartByIdService(cartId);
        console.log("3C" + JSON.stringify(cartPuchase, null, '\t'));
        console.log("4 Empiezo a recorrer carrito");
        cartPuchase[0].products.forEach((product) => {
        if (product.product.stock > product.quantity) {
            const resultStock = stockProductService(product.product._id, product.quantity*-1)
            //console.log("7 resultado de baja de stock" + resultStock);
            const prodData = {
                    price: product.product.price,
                    quantity: product.quantity
            }
            newCart.push(prodData);
            console.log("8 nuevo carrito" + newCart);
            const resultDelete = deleteProductInCartService(cartPuchase[0]._id,product.product._id);
                //console.log("9 resultado de delete de cart" + resultDelete);
            } else {
                const prodData = {
                    id: product._id
                };
                noCart.push(prodData);
            }
        });
        console.log(noCart);
        //Recorro el carrito y verifico que el Stock sea correcto y genero el ticket
        if (newCart.length > 0){
            console.log("10 llamo a grabar ticket");
            const result = await postPurchaseService(newCart, userMail);
            //console.log("router: " + JSON.stringify(result, null, '\t'));
            if (noCart.length > 0) {
                res.status(200).send({ status: 'success', payload: `Se genero correctamente la compra con el ID ${result.code} y no pudieron procesarse por falta de stock ${noCart}`  })
            } else {
                res.status(200).send({ status: 'success', payload: `Se genero correctamente la compra con el ID ${result.code}`  })
            }
        } else {
            if (noCart.length > 0) {
                res.status(404).send({ status: "NOT FOUND", payload: `No pudieron procesarse por falta de stock ${JSON.stringify(noCart)}` });
            } else {
                res.status(404).send({ status: "NOT FOUND", payload: `No hay productos en el carrito!` });
            }
        };
    } catch (error) {
        const response = { status: "Error", payload: `El carrito con ID ${cartId} NO existe!` };
        return res.status(404).json(response);
    };
};

export {
    postCart, 
    getCartById,
    putCartById,
    putProductInCart,
    deleteCart,
    deleteProductInCart,
    deleteAllProductsInCart,
    postPurchase
};