import { Router } from "express";
import ProductManager from "../dao/dbManagers/productManager.js"

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts()
        /* res.render("home", { products }); */
        res.render('home');
    } catch (error) {
        console.log(error);
    }
    
});

export default router;
