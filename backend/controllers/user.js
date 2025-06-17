import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Hotel from "../models/hotel.js";
dotenv.config();


const signup = async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({
            message: "User already exists with this email"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name, email, phoneNumber, password: hashedPassword
    })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
        message: "User created successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber
        },
        token
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ user, token });
}


const deleteUser = async (req, res) => {
    const userId = req.user.userId;

    const hotels = await Hotel.find({ owner: userId });
    if (hotels.length > 0) {
        return res.status(400).json({
            message: "You cannot delete your account while you have hotels listed"
        });
    }
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json({
        message: "User deleted successfully"
    });
}


export { signup, login, deleteUser }