import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    city: { type: String, required: true },
    landmark: { type: String },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    coordinates: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

// Add 2dsphere index for geospatial queries
hotelSchema.index({ coordinates: "2dsphere" });

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
