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
            coordinates = await getCoordinatesFromCity(city); // returns { lat, lng }
        }

        const geoCoordinates = {
            type: "Point",
            coordinates: [coordinates.lng, coordinates.lat]
        };

        const images = req.files.map(file => file.path);

        const hotel = await Hotel.create({
            name,
            description,
            city,
            landmark,
            address,
            price,
            images,
            coordinates: geoCoordinates,
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
            // images,
            // coordinates, // may come from frontend
        } = req.body;

        // let finalCoordinates = coordinates;

        // if (!finalCoordinates && city && city !== hotel.city) {
        //     finalCoordinates = await getCoordinatesFromCity(city);
        // }

        // const geoCoordinates = finalCoordinates
        //     ? {
        //         type: "Point",
        //         coordinates: [finalCoordinates.lng, finalCoordinates.lat],
        //     }
        //     : hotel.coordinates;

        const updatedHotel = await Hotel.findByIdAndUpdate(
            hotelId,
            {
                name,
                description,
                city,
                landmark,
                address,
                price,
                // images,
                // coordinates: geoCoordinates,
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

const getHotelsByCity = async (req, res) => {
    const { city } = req.params;
    const hotels = await Hotel.find({
        city: { $regex: new RegExp(city, 'i') }
    });

    if (!hotels || hotels.length === 0) {
        return res.status(404).json({
            message: "No hotels found in this city"
        });
    }
    res.status(200).json({
        message: "Hotels in city fetched successfully",
        hotels
    });
}
const getAllHotelsByCoordinates = async (req, res) => {
    const { lng, lat } = req.query;
    console.log(lng, lat);

    if (!lng || !lat) {
        return res.status(400).json({ message: "Coordinates are required" });
    }

    try {
        const hotels = await Hotel.find({
            coordinates: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lng), parseFloat(lat)]
                    },
                    $maxDistance: 5000 // meters (5km)
                }
            }
        });

        if (hotels.length === 0) {
            return res.status(404).json({ message: "No nearby hotels found" });
        }

        res.status(200).json({
            message: "Nearby hotels fetched successfully",
            hotels
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

export { addNewHotel, getMyHotels, editHotel, deleteMyHotel, getAllHotels, getHotel, getHotelsByCity, getAllHotelsByCoordinates };