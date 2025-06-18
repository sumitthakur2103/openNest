import Hotel from "../models/hotel.js";
import { getCoordinatesFromCity } from "../utils/geocode.js";

const addNewHotel = async (req, res) => {
    try {
        const {
            name,
            description,
            city,
            landmark,
            address,
            price,
        } = req.body;

        let coordinates = req.body.coordinates;
        if (!coordinates) {
            coordinates = await getCoordinatesFromCity(city);
        }

        // Get image URLs from multer-cloudinary
        const images = req.files.map(file => file.path);

        const hotel = await Hotel.create({
            name,
            description,
            city,
            landmark,
            address,
            price,
            images,
            coordinates,
            owner: req.user.userId,
        });

        res.status(201).json({
            message: "Hotel created successfully",
            hotel
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to add hotel", error: err.message });
    }
};

const getMyHotels = async (req, res) => {
    const hotels = await Hotel.find({ owner: req.user.userId });
    res.status(200).json({
        message: "Hotels fetched successfully",
        hotels
    });
}

const editHotel = async (req, res) => {
    const { hotelId } = req.params;
    const userId = req.user.userId;

    try {
        const hotel = await Hotel.findById(hotelId);

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        if (hotel.owner.toString() !== userId) {
            return res.status(403).json({
                message: "You are not authorized to edit this hotel",
            });
        }

        const {
            name,
            description,
            city,
            landmark,
            address,
            price,
            images,
            coordinates, // optional from frontend
        } = req.body;

        let finalCoordinates = coordinates;

        // If city is changed and coordinates not provided, fetch new ones
        if (!finalCoordinates && city && city !== hotel.city) {
            finalCoordinates = await getCoordinatesFromCity(city);
        }

        // If coordinates still missing, keep old
        if (!finalCoordinates) {
            finalCoordinates = hotel.coordinates;
        }

        const updatedHotel = await Hotel.findByIdAndUpdate(
            hotelId,
            {
                name,
                description,
                city,
                landmark,
                address,
                price,
                images,
                coordinates: finalCoordinates,
            },
            { new: true }
        );

        return res.status(200).json({
            message: "Hotel updated successfully",
            hotel: updatedHotel,
        });
    } catch (error) {
        console.error("Edit Hotel Error:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


const deleteMyHotel = async (req, res) => {
    const { hotelId } = req.params;
    const userId = req.user.userId;


    const hotel = await Hotel.findById(hotelId);
    if (hotel) {
        if (hotel.owner.toString() !== userId) {
            return res.status(403).json({
                message: "You are not authorized to delete this hotel"
            });
        }
        await Hotel.findByIdAndDelete(hotelId);
        return res.status(200).json({
            message: "Hotel deleted successfully"
        });
    }
    else {
        return res.status(404).json({
            message: "Hotel not found"
        });
    }
}


const getAllHotels = async (req, res) => {
    const hotels = await Hotel.find({});
    res.status(200).json({
        message: "All hotels fetched successfully",
        hotels
    });
    if (!hotels || hotels.length === 0) {
        return res.status(404).json({
            message: "No hotels found"
        });
    }
}

const getHotel = async (req, res) => {
    const { hotelId } = req.params;
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
        return res.status(404).json({
            message: "Hotel not found"
        });
    }
    res.status(200).json({
        message: "Hotel fetched successfully",
        hotel
    });
}


export { addNewHotel, getMyHotels, editHotel, deleteMyHotel, getAllHotels, getHotel };