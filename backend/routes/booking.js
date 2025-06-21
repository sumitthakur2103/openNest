import { Router } from "express";
import { bookRoom, getMyBookings } from "../controllers/booking.js";
import { authMiddleware } from "../middlewares/auth.js";
const router = Router();

router.route("/bookNewRoom").post(authMiddleware, bookRoom);

router.route("/getMyBookings").get(authMiddleware, getMyBookings);

export default router;