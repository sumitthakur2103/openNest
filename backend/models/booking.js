import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    guestDetails: [
        {
            name: { type: String, required: true },
            age: { type: Number, required: true },
        }
    ],
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
