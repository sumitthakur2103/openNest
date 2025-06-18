import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    city: { type: String, required: true },
    landmark: { type: String },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }], // Array of image URLs
    coordinates: {
        lat: { type: Number, required: true, default: 0 },
        lng: { type: Number, required: true, default: 0 },
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;