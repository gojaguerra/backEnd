import { cartModel } from "../models/cartModel.js"

export default class CartManager {

    constructor() {
        console.log('Working carts with DB');
    };

    getCarts = async () => {
        const carts = await cartModel.find().lean();
        return carts;
    };

    addCart = async (cart) => {
        const result = await cartModel.create(cart);
        return result;
    };

    getCartById = async (id) => {
        //Leo de la base devolviendo los productos
        const cart = await cartModel.find({_id:id}).lean();
        return cart;         
    };

    addProductInCart = async (id, productId) => {
        const result = await cartModel.updateOne({_id: id}, productId);
        return result;
    };

};