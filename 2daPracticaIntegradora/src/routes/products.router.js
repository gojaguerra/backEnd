import { Router } from 'express';
import ProductManager from "../dao/dbManagers/productManager.js"

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
        //MongoDb
        //leo el parametro por req.query
        const limit = parseInt(req.query.limit, 10) || 3;
        const page = parseInt(req.query.page, 10) || 1;
        let query = req.query.query; 
        let sort  = req.query.sort;
        try {
            let sort1= "";
            let sort2= "";
            let query1= "";
            let query2= "";
            if (query) {
                query2= query; 
                query1= {category: query};
            }
            if (sort) {
                sort2=sort;
                sort1= {price: sort};
            }
            //console.log(query);
            const products = await productManager.getProducts(limit, page, query1, sort1);
            products.prevLink = products.hasPrevPage?`http://localhost:8080/api/products?page=${products.prevPage}&query=${query2}&sort=${sort2}`:'';
            products.nextLink = products.hasNextPage?`http://localhost:8080/api/products?page=${products.nextPage}&query=${query2}&sort=${sort2}`:'';
            products.isValid= !(page<=0||page>products.totalPages)
            //Postman
            // res.send({ status: "success", payload: products}); 
            //Render page
            res.render("products.handlebars", products );
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
    const product = req.body;
    if (!product.status){
        product.status = true
    };
    if(!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category){
        // return res.status(400).send({ error:'Faltan completar campos!' });
        return res.status(400).send({ status: 'error', error: 'Faltan completar campos!' })
    };

    try {
        const result = await productManager.addProduct(product);
         //Valido el resultado de la creacion del producto
        if (result.acknowledged) {
            const io = req.app.get('socketio');
            io.emit("showProducts", await productManager.getProducts());
        };

        const response = { status: "Success", payload: result};

        //res.status(200).json(response);
        // muestro resultado
        // res.redirect("/realTimeProducts");
        res.send({ status: 'success', message: 'Product OK' })

    } catch (error) {
        if(error.code===11000){
            // Código de producto duplicado
            res.status(501).send({ status: "error", error });
        }else{
            res.status(500).send({ status: "error", error });
        };
    };

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
            const response = { status: "Success", payload: `El producto con ID ${id} fue eliminado!`}; 
            res.status(200).json(response);
        } else {
            const response = { status: "NOT FOUND", payload: `NO existe el producto que desea eliminar!`}; 
            res.status(404).json(response);
        };
    } catch (error) {
        res.status(404).json({ status: "NOT FOUND", payload: `NO existe el producto que desea eliminar!` });
        /* res.status(500).send({ status: "error", error }); */
    }

});

export default router;
