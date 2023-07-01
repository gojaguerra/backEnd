import ProductManager from "../dao/dbManagers/productManager.js"
import CartManager from "../dao/dbManagers/cartManager.js"
import UserManager from "../dao/dbManagers/user.Manager.js"

const productManager = new ProductManager();
const cartManager = new CartManager();
const userManager = new UserManager();

export const PRODUCTDAO = productManager;
export const CARTDAO = cartManager;
export const USERDAO = userManager;