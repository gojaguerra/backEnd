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

    addProductInCart = async (cartId, productId) => {
        // Veririco si existe y lo incremento en 1
        const result = await cartModel.updateOne({_id: cartId, "products.product": productId},{$inc: {"products.$.quantity": 1}});
        // Si el resultado modifiedCount = 0, inserto en el arreglo products
        if (result.acknowledged & result.modifiedCount === 0){
            //creo arreglo para el nuevo producto con sus datos
            const newProduct = {
                product: productId,
                quantity: 1
                };
            const result = await cartModel.updateOne({_id: cartId}, {$push: { products: newProduct}});
            return result
        };
        return result;
    };
    
    /* addProductInCart = async(cartId, productId) => {
        try {
            // Traigo los Carritos
            const cart = await cartModel.findOne({ _id: cartId });
            
            //Valido si el item esta en el carrito
            const isInCart = (id) => {
                return (
                    cart.products.some(item => item.product === id)
                )
            }

            if  (isInCart(productId)){
                const productIndex = cart.products.findIndex(prod => prod.product === productId);
                cart.products[productIndex].quantity++;
            } else {
                //creo arreglo para el nuevo producto
                const newProduct = {
                    product: productId,
                    quantity: 1
                };
                cart.products.push(newProduct);
            }

            const result = await cartModel.updateOne({_id: cartId}, cart);
            return result;

        } catch (error){
            console.log("error:", error);
        }

    }
 */

};