import { Router } from "express";
import { bookRoom, getMyBookings, checkBookingExists } from "../controllers/booking.js";
import { authMiddleware } from "../middlewares/auth.js";
const router = Router();

router.route("/bookNewRoom").post(authMiddleware, bookRoom);

router.route("/getMyBookings").get(authMiddleware, getMyBookings);

router.post("/checkBookingExists", checkBookingExists);

export default router;