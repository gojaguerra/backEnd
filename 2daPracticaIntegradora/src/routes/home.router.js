import { Router } from "express";
// import ProductManager from "../dao/dbManagers/productManager.js"
import { passportCall } from "../utils.js";


const router = Router();
// RENDERIZO HBS
router.route('/')
    .get(passportCall('jwt'), (req, res) => {
        res.render('home.handlebars', {
            user: req.user
        });
    });

/* const productManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts()
        res.render('home');
    } catch (error) {
        console.log(error);
    }
    
}); */

export default router;
