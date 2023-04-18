import { Router } from 'express';
import ProductManager from '../managers/productManager.js';
const router = Router();

const productManager = new ProductManager('./files/products.json');

router.get('/', async(req, res) => {
    //llamar al metodo getProducts
    const products = await productManager.getProducts()
    res.send({ products })
});

router.get('/:id', async(req, res) => {//buscar por id un producto
    const id = parseInt(req.params.id)
    const product = await productManager.getProductById(id);
    res.send({product})
});

router.post('/', async(req, res) => {
    const product = req.body;//ingreso producto por body
    if (!product.status){//pongo el status en true validando
        product.status = true
    }
    if(!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category){
        return res.status(400).send({error:'incomplete values'});
    }
    //llamar al metodo addProduct    
    const result = await productManager.addProduct(product);

    res.send({ status: 'success', result })//si salio todo ok lo guardo y muestro
});

router.put('/:id', async(req,res) =>{
    // llamar al metodo updateProduct para actualizar sin modificar el id
    const id = parseInt(req.params)
    const product = req.body;

    const result = await productManager.updateProduct();

    res.send({status: 'success', product})
});

router.delete('/:id',(req,res)=>{
    const id = parseInt(req.params)
    //llamar al metodo deleteProduct pasandole como parametro id
    res.send({status: 'success'})
})


export default router;
