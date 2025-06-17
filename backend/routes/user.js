import { Router } from "express";
import { login, signup, deleteUser } from "../controllers/user.js";
import { authMiddleware } from "../middlewares/auth.js";
const router = Router()

router.route("/login").post(login);

router.route("/register").post(signup);

router.route("/").delete(authMiddleware, deleteUser);
export default router;