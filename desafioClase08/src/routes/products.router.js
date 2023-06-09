import { Router } from 'express';
import ProductManager from '../managers/productManager.js';

const router = Router();
const productManager = new ProductManager('./files/products.json');

router.get('/', async(req, res) => {
    //llamar al metodo getProducts
    const products = await productManager.getProducts()

    /* res.send({ products }) */

    const { limit } = req.query;

    const nuevoArreglo = [];

    if (limit){
        for (let i=0; i<=limit-1 && i < products.length; i++) {
                nuevoArreglo.push(products[i]) ;    
        }
        const response = {
            status: "OK",
            data: nuevoArreglo,
        };

        res.send(response);
    } else {
        const response = {
            status: "OK",
            data: products,
        };
        res.send(response)
    }

});

/* router.get('/:id', async(req, res) => {//buscar por id un producto
    const id = parseInt(req.params.id)
    const product = await productManager.getProductById(id);
    res.send({product})
}); */

router.get('/:id', async(req, res) => {
    const id = Number(req.params.id);
    const product = await productManager.getProductById(id);

    //Valido el resultado de la búsqueda
    const response = product!==-1 
    ? { status: "OK", data: product} 
    : { status: "NOT FOUND", data: `El producto con ID ${id} NO existe!` };

const statusCode = product!==-1 ? 200 : 404;

//muestro resultado
res.status(statusCode).json(response);

    /* if (!product) {
        return res.send(404).send({ error: 'product not found' });
    }
    res.send({ status: ' success', product }); */
})

router.post('/', async(req, res) => {
    const product = req.body;//ingreso producto por body
    if (!product.status){//pongo el status en true validando
        product.status = true
    }
    if(!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category){
        return res.status(400).send({error:'incomplete values'});
    }

    const result = await productManager.addProduct(product);
/*     if (!result) {
        return res.status(404).send({ error: 'producto existe!' });
    }

    res.send({ status: 'success', result })//si salio todo ok lo guardo y muestro */

     //Valido el resultado de la búsqueda
     const response = result !==-1 
     ? { status: "Success", data: result} 
     : { status: "NOT FOUND", data: `Ya existe el producto que desea crear!` };
     //Valido marco el estado según el resultado
     const statusCode = result!==-1 ? 200 : 404;

     //muestro resultado
     res.status(statusCode).json(response);

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

    //Intento actualizar los datos de productos
    const result = await productManager.updateProduct(id,product);

    // Valido el resultado del Update
    const response = result !==-1 
    ? { status: "Success", data: `El producto con ID ${id} fue actualizado con éxito!`} 
    : { status: "NOT FOUND", data: `El producto con ID ${id} NO existe!` };

    const statusCode = result !==-1 ? 200 : 404;

    //muestro resultado
    res.status(statusCode).json(response); 
})

router.delete('/:id', async(req,res)=>{
    /* const id = parseInt(req.params) */
    const id = Number(req.params.id);
    //llamar al metodo deleteProduct pasandole como parametro id

    const result = await productManager.deleteProductById(id);

    /* res.send({status: 'success'}) */

    const response = result !==-1 
    ? { status: "Success", data: result} 
    : { status: "NOT FOUND", data: `NO existe el producto que desea eliminar!` };
    //Valido marco el estado según el resultado
    const statusCode = result!==-1 ? 200 : 404;

    //muestro resultado
    res.status(statusCode).json(response);

})


export default router;
