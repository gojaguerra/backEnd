import { Router } from "express";
import Users from "../dao/dbManagers/users.js";
import Courses from "../dao/dbManagers/courses.js";

const router = Router();
const userManager = new Users();
const courseManager = new Courses();

router.get("/", async (req, res) => {
    try {
        const users = await userManager.getAll();
        res.render("users", { users });
    } catch (error) {
        console.log(error);
    }
    
});

router.get("/courses", async (req, res) => {
    try {
        const courses = await courseManager.getAll();
        res.render("courses", { courses });
    } catch (error) {
        console.log(error);
    }
    
});

export default router;