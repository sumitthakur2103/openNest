import React from 'react';
import '../styles/Hotelcard.css';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios.js';
export default function Hotelcard({ hotel, onDelete }) {

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/editHotel/${hotel._id}`);
    }

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/hotels/${hotel._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            onDelete(hotel._id); // Call the onDelete function passed from Myhotels component
        } catch (err) {
            console.error("Error deleting hotel:", err);
        }
    }
    return (
        <div className="hotel-card">
            <img src={hotel.image} alt={hotel.name} className="hotel-image" />
            <div className="hotel-details">
                <h3 className="hotel-name">{hotel.name}</h3>
                <p className="hotel-description">{hotel.description}</p>
                <div className="hotel-city">{hotel.city}</div>
                <div className="hotel-landmark">{hotel.landmark}</div>
                <div className="hotel-address">{hotel.address}</div>
                <div className="hotel-price">₹{hotel.price}</div>
                <div className="hotel-actions">
                    <button className="edit-btn" onClick={handleEdit}>Edit</button>
                    <button className="delete-btn" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}
