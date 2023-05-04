import { Router } from "express";
import { userModel } from "../models/user.model.js";

const router = Router();

router.get("/", async (req, res) => {
    try{
        const users = await userModel.find();
        res.send({ result: "success", payload: users })
    } catch (error) {
        res.status(500).send({ error });
    }
});

export default router;