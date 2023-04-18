import { log } from 'console';
import fs from 'fs';

export default class productManager {

    constructor(path) {
        this.path = path;
        this.products = [];
    }

    getProducts = async () => {
        try {
            //Verifico que exista el archivo para leerlo
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const product = JSON.parse(data);
                return product;
            }else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) => {
        try {
            // Traigo los productos
            const products = await this.getProducts();
           
            // Busco el indice del ID a consultar
            const codeIndex = products.findIndex(producto => producto.id === id);

            // Valido que exista y retorno el resultado
            if (codeIndex===-1) {
                /* console.log(`El producto con ID ${id} NO existe!`); */
                return codeIndex         
            } else {
                return products[codeIndex]
            }
        }catch (error){
            console.log("ERROR:",error);
        }
    }
    /* title, description, code, price, status, stock, category, thumbnail */
    addProduct = async (product) => {
        try {
            // Traigo los productos
            const products = await this.getProducts();
            
            // Busco el indice del producto por su CODE a consultar
            const codeIndex = products.findIndex(producto => producto.code === product.code);

            // VALIDO NO EXISTA EL PRODUCTO POR EL CAMPO DE VALIDACION CODE
            if (codeIndex!=-1) {
                return -1;           
            }

            // ASIGNO ID
            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = products[products.length - 1].id + 1;
            }

            // Agrego y escribo el archivo
            products.push(product);   
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return product;

        } catch (error){
            console.log(error);
        }
    }

    updateProduct = async(id, field, value) =>{
        try {
            const products = await this.getProducts();
            if(field==="id"){
                return console.log("error no se puede modificar el id");
            }
            const updatedProduct = products.map(prod =>
                prod.id === id ? { ...prod, [field]: value,} : prod
            );             
            await fs.promises.writeFile(this.path, JSON.stringify(updatedProduct, null, '\t'));
            return updatedProduct

        }
        catch (error) {
            console.log(error);
        }
    }

    deleteProductById = async (id) => {
        try {
            // Traigo los productos
            const products = await this.getProducts();
            // Busco el indice del ID a actualizar
            const codeIndex = products.findIndex(producto => producto.id === id);
            
            // Valido que exista 
            if (codeIndex===-1) {
                /* console.log(`El producto con ID ${id} NO existe!`); */
                return -1;
            } 
            
            //Elimino el producto del indice antes buscado
            products.splice(codeIndex,1);

            //Escribo el archivo con los datos modificados
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return;

        }catch (error){
            console.log(error);
        }
    }
};
