import ProductsDao from '../dao/dbManagers/productManager.js';

export default class ProductsRepository {
    constructor() {
        this.dao = new ProductsDao();
    }

    getProducts = async (limit, page, query, sort) => {
        const result = await this.dao.getProducts(limit, page, query, sort);
        return result;
    }

    getProductById = async (id) => {
        const result = await this.dao.getProductById(id);
        return result;
    }

    addProduct = async (product) => {
        const result = await this.dao.addProduct(product);
        return result;
    }

    updateProduct = async (id, product) => {
        const result = await this.dao.updateProduct(id, product);
        return result;
    }

    deleteProductById = async (id) => {
        const result = await this.dao.deleteProductById(id);
        return result;
    }

}