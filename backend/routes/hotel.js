import { Router } from "express";
import { addNewHotel, getMyHotels, editHotel, getAllHotels, deleteMyHotel, getHotel } from "../controllers/hotel.js";
import { authMiddleware } from "../middlewares/auth.js";
const router = Router();


// ____Particular User routes______

//add new hotel by user
router.route("/add").post(authMiddleware, addNewHotel);

//get all hotels of a user
router.route("/getMyHotels").get(authMiddleware, getMyHotels);


// ____Public routes______
//all hotels
router.route("/").get(getAllHotels);

//edit individual hotel
router.route("/:hotelId").post(authMiddleware, editHotel);

//delete individual hotel
router.route("/:hotelId").delete(authMiddleware, deleteMyHotel);

//view individual hotel 
router.route("/:hotelId").get(getHotel);


export default router;