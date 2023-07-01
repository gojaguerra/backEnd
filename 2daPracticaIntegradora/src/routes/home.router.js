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

export default router;
