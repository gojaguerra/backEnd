import { productModel } from '../models/productModel.js';

export default class ProductManager {

    constructor() {
        console.log('Working products with DB');
    };

    getProducts = async () => {
        //Leo de la base devolviendo los productos
        const products = await productModel.find().lean();
        return products;
    };

    getProductById = async (id) => {
        //Leo de la base devolviendo los productos
        const product = await productModel.find({_id: id}).lean();
        return product;
    };

    addProduct = async (product) => {
        const result = await productModel.create(product);
        return result;
    };

    updateProduct = async (id, product) => {
        const result = await productModel.updateOne({_id: id}, product);
        return result;
    };

    deleteProductById = async (id) => {
        const result = await productModel.deleteOne({_id: id});
        return result;
    };

};
