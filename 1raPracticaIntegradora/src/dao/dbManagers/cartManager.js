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
        console.log(id);
        console.log(productId);
        const result = await cartModel.updateOne({_id: id}, productId);
        return result;
    };
    
/*     //Valido si el item esta en el carrito
    isInCart = async (cartId, productId) => {
    return (
        await cartModel.find({$and:[{_id: {cartId}}, {product: {productId}}] })
    )}; */

};