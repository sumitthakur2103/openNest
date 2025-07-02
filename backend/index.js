import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import bookingRoutes from './routes/booking.js'; // Assuming you have a bookings route
import hotelRoutes from './routes/hotel.js'; // Assuming you have a hotels route
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/hotels", hotelRoutes); // Assuming you have a hotels route
app.use("/api/v1/bookings", bookingRoutes); // Assuming you have a bookings route
app.use('/api/v1/payments', paymentRoutes);

const start = async () => {
    try {
        const connectionDb = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${connectionDb.connection.host}`);

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

start();
