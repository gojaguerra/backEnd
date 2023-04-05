import express from 'express';
import productManager from './productManager.js';

const app = express();

//Creamos la instancia de la clase
const ProductManager = new productManager('./products.json');

app.use(express.urlencoded({extended: true}));

//Ruta /products + query limits
app.get('/products', async (req, res) => {
    const { limit } = req.query;
    const products = await ProductManager.getProducts();

    const nuevoArreglo = [];
    
    if (limit){
        for (let i=0; i<=limit-1 && i < products.length; i++) {
            nuevoArreglo.push(products[i]) ;
        }
        res.send(nuevoArreglo)
    } else {
        res.send(products);
    }
})

//Ruta /products/:pid 
app.get('/products/:pid', async (req, res) => {
    const productId = Number(req.params.pid);
    const productById = await ProductManager.getProductById(productId);
    
    productById===-1 ? res.send(`El producto con id ${productId} no existe!`) : res.send(productById);

})

app.listen(8080, () => console.log("escuchando port 8080"));