import { Router } from 'express';
import ProductManager from "../dao/dbManagers/productManager.js"

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await productManager.getProducts(limit);
        /* res.send({ status: "success", payload: products}); */
        res.render("products.handlebars", { products });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
});

router.get('/:pid', async(req, res) => {
    const id = String(req.params.pid);
    
    // BUsco el ID en el arreglo
    try {
        const productById = await productManager.getProductById(id);
        const response = { status: "OK", payload: productById} 
        //muestro resultado
        //Postman
        res.status(200).json(response);
        //Render page
        //res.render("products.hbs", { productById });
    } catch (error) {
        const response = { status: "NOT FOUND", payload: `El producto con ID ${id} NO existe!` };
        //Postman
        res.status(404).json(response);
    };
});

router.post('/', async(req, res) => {
    const product = req.body;//ingreso producto por body
    if (!product.status){//pongo el status en true validando
        product.status = true
    }
    if(!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category){

        return res.status(400).send({error:'Faltan completar campos!'});
    }

    try {
        const result = await productManager.addProduct(product);

         //Valido el resultado de la creacion del producto
        if (result.acknowledged) {
            const io = req.app.get('socketio');
            io.emit("showProducts", await productManager.getProducts());
        };

        const response = { status: "Success", payload: result};

        //res.status(200).json(response);
        //muestro resultado
        res.redirect("/realTimeProducts");

    } catch (error) {
        res.status(500).send({ status: "error", error });
    }

});

router.put('/:pid', async(req,res) =>{
    // llamar al metodo updateProduct para actualizar sin modificar el id
    const id = String(req.params.pid);
    const product = req.body;

    /* console.log(product.category); */
    /* if(!product.title || !product.description || !product.code || !product.price || 
        !product.stock || !product.category || !product.status){
        return res.status(400).send({error:'Hay campos que faltan completar!'});
    } */

    if("id" in product){
        return res.status(404).json({ status: "NOT FOUND", data: "Error no se puede modificar el id"});
    }
    
    //Intento actualizar los datos de productos
    try {
        const result = await productManager.updateProduct(id, product);
        if (result.acknowledged) {
            const response = { status: "OK",  payload: `El producto con ID ${id} fue actualizado con éxito!`};
            res.status(200).json(response);
        } else {
            res.status(200).send("ERROR");
        }
    } catch (error) {
        res.status(404).send({ status: "error", error });
    }

});

router.delete('/:pid', async(req,res)=>{
    const id = String(req.params.pid);
    //llamar al metodo deleteProduct pasandole como parametro id

    try {
        const result = await productManager.deleteProductById(id);

        //Valido el resultado de la búsqueda y renderizo con el socket
        if (result.acknowledged & result.deletedCount!==0 ) {
            const io = req.app.get('socketio');
            io.emit("showProducts", await productManager.getProducts());
        };

        const response = (result.acknowledged & result.deletedCount!==0)
        ? { status: "Success", data: result} 
        : { status: "NOT FOUND", data: `NO existe el producto que desea eliminar!` };
        //Valido marco el estado según el resultado
        const statusCode = 200;

        //muestro resultado
        res.status(statusCode).json(response);
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }

});

export default router;
