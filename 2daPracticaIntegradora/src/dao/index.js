import ProductManager from "../dao/dbManagers/productManager.js"
import CartManager from "../dao/dbManagers/cartManager.js"

const productManager = new ProductManager();
const cartManager = new CartManager();

export const PRODUCTDAO = productManager;
export const CARTDAO = cartManager;
