import Booking from '../models/booking.js';

const bookRoom = async (req, res) => {
    try {
        const { hotelId, checkInDate, checkOutDate, totalPrice, guestDetails } = req.body;
        const userId = req.user.userId;

        // Validate input
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (new Date(checkInDate) >= new Date(checkOutDate)) {
            return res.status(400).json({ message: "Check-out date must be after check-in date" });
        }


        if (!hotelId || !checkInDate || !checkOutDate || !totalPrice || !guestDetails) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Create a new booking
        const booking = await Booking.create({
            userId,
            hotelId,
            checkInDate,
            checkOutDate,
            totalPrice,
            guestDetails
        });
        res.status(201).json({
            message: "Room booked successfully",
            booking
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to book room", error: err.message });
    }
}
const checkBookingExists = async (req, res) => {
    try {
        const { hotelId, checkInDate, checkOutDate } = req.body;

        if (!hotelId || !checkInDate || !checkOutDate) {
            return res.status(400).json({
                message: "Hotel ID, check-in date, and check-out date are required",
            });
        }

        const existingBooking = await Booking.findOne({
            hotelId,
            checkInDate: { $lte: new Date(checkOutDate) },
            checkOutDate: { $gte: new Date(checkInDate) },
        });

        if (existingBooking) {
            return res.json({ exists: true, booking: existingBooking });
        }

        return res.json({ exists: false });
    } catch (error) {
        console.error("Error checking booking:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const getMyBookings = async (req, res) => {
    const userId = req.user.userId;

    try {
        const bookings = await Booking.find({ userId })
            .populate('hotelId', 'name city address images price')
            .sort({ createdAt: -1 });

        return res.status(200).json({ bookings });
    }
    catch (err) {
        return res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
    }
}

export { bookRoom, getMyBookings, checkBookingExists };