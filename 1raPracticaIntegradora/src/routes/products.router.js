import { Router } from 'express';
import ProductManager from "../dao/dbManagers/productManager.js"

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts()
        /* res.send({ status: "success", payload: products}); */
        res.render("products.handlebars", { products });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
});

router.get('/:id', async(req, res) => {
    const id = String(req.params.id);
    
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

/*     try {
        const result = await usersManager.save({
            first_name,
            last_name,
            dni,
            email,
            birth_date,
            gender
        });

        res.send({ status: "success", payload: result})
    } catch (error) {
        res.status(500).send({ status: "error", error });
    } */

    try {
        const result = await productManager.addProduct(product);

         //Valido el resultado de la creacion del producto
        if (result !==-1 ) {
            const io = req.app.get('socketio');
            io.emit("showProducts", await productManager.getProducts());
        };

        //Valido el resultado de la búsqueda
        const response = result !==-1 
        ? { status: "Success", data: result} 
        : { status: "FOUND", data: `Ya existe el producto que desea crear!` };
        //Valido marco el estado según el resultado
        const statusCode = result!==-1 ? 200 : 404;

        //muestro resultado
        res.redirect("/realTimeProducts");
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }

});

router.put('/:id', async(req,res) =>{
    // llamar al metodo updateProduct para actualizar sin modificar el id
    const id = Number(req.params.id);
    const product = req.body;

    /* console.log(product.category); */
    if(!product.title || !product.description || !product.code || !product.price || 
        !product.stock || !product.category || !product.status){
        return res.status(400).send({error:'Hay campos que faltan completar!'});
    }

    if("id" in product){
        return res.status(404).json({ status: "NOT FOUND", data: "Error no se puede modificar el id"});
    }
    
/*     try {
        const result = await coursesManager.update(id, {
            title,
            description,
            teacher
        });

        res.send({ status: "success", payload: result})
    } catch (error) {
        res.status(500).send({ status: "error", error });
    } */

    //Intento actualizar los datos de productos
    try {
        const result = await productManager.updateProduct(id, product);

        // Valido el resultado del Update
        const response = result !==-1 
        ? { status: "Success", data: `El producto con ID ${id} fue actualizado con éxito!`} 
        : { status: "NOT FOUND", data: `El producto con ID ${id} NO existe!` };

        const statusCode = result !==-1 ? 200 : 404;

        //muestro resultado
        res.status(statusCode).json(response);
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
})

router.delete('/:id', async(req,res)=>{
    const id = Number(req.params.id);
    //llamar al metodo deleteProduct pasandole como parametro id

    try {
        const result = await productManager.deleteProductById(id);

        //Valido el resultado de la búsqueda
        if (result !==-1 ) {
            const io = req.app.get('socketio');
            io.emit("showProducts", await productManager.getProducts());
        };

        const response = result !==-1 
        ? { status: "Success", data: result} 
        : { status: "NOT FOUND", data: `NO existe el producto que desea eliminar!` };
        //Valido marco el estado según el resultado
        const statusCode = result!==-1 ? 200 : 404;

        //muestro resultado
        res.status(statusCode).json(response);
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }

})


export default router;
