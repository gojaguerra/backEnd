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
        //Leo de la base devolviendo el carrito
        const cart = await cartModel.find({_id:id}).lean();
        return cart;         
    };

/*     addProductInCart = async (cartId, productId) => {
        // Veririco si existe y lo incremento en 1
        const result = await cartModel.updateOne({ _id: cartId, "products.product": productId }, {$inc: {"products.$[].quantity": 1}}, { 
            "arrayFilters": [{ "product._id": productId }], 
            "multi": false 
          });
        console.log("result 1:",result);
        // Si el resultado modifiedCount = 0, inserto en el arreglo products
        if (result.acknowledged & result.modifiedCount === 0){
            //creo arreglo para el nuevo producto con sus datos
            const newProduct = {
                product: productId,
                quantity: 1
                };
            const result = await cartModel.updateOne({_id: cartId}, {$push: { products: newProduct}});
            console.log("result 2:",result);
            return result;
        };
        return result;
    }; */

    addProductInCart = async (cartId,productId,quantity) => {
        //Intento incrementar la cantidad si se encuentra el producto en el carrito
        const result = await cartModel.updateOne({_id: cartId, "products.product": productId },
        {$inc: {"products.$.quantity": quantity}});
        //console.log("result:" + JSON.stringify(result, null, '\t'));
        //Pregunto si pudo modificar, sino pudo es que no existe y lo agrego
        if (result.acknowledged & result.modifiedCount === 0){
            //creo arreglo para el nuevo producto con sus datos
            const newProduct = {
                product: productId,
                quantity: quantity
                };
            const result = await cartModel.updateOne({_id: cartId}, {$push: { products: newProduct}});
            return result;
        };
        return result;
    };

    deleteProductInCart = async (cartId, productId) => {
        const result = await cartModel.updateOne({_id: cartId }, { $pull: { products: [ productId] }});
        console.log("deleteProductsInCart:", result);
        return result;
    };

    deleteAllProductsInCart = async (cartId) => {
        const result = await cartModel.updateOne({_id: cartId }, { $set: { products: [] }});
        console.log("deleteProductsInCart:", result);
        return result;
    };
    
};