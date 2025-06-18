// utils/geocode.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const getCoordinatesFromCity = async (city) => {
    const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;
    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        city
    )}.json?access_token=${MAPBOX_API_KEY}&limit=1`;

    try {
        const response = await axios.get(endpoint);
        const [lng, lat] = response.data.features[0].center;
        return { lat, lng };
    } catch (error) {
        console.error("Geocoding error:", error.message);
        return { lat: 0, lng: 0 }; // fallback
    }
};
