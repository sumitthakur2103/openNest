import React from "react";
import "../styles/Hotelcard.css";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.js";

export default function Hotelcard({ hotel, onDelete }) {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/editHotel/${hotel._id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await axios.delete(`/hotels/${hotel._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      onDelete(hotel._id);
    } catch (err) {
      console.error("Error deleting hotel:", err);
    }
  };

  return (
    <div className="hotel-card" onClick={() => navigate(`/hotel/${hotel._id}`)}>
      {hotel.images && hotel.images.length > 0 ? (
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="hotel-card-image"
        />
      ) : (
        <div className="hotel-card-image placeholder">No Image</div>
      )}

      <div className="hotel-card-details">
        <h3 className="hotel-card-name">{hotel.name}</h3>
        <p className="hotel-card-description">{hotel.description}</p>
        <div className="hotel-card-city">{hotel.city}</div>
        <div className="hotel-card-landmark">{hotel.landmark}</div>
        <div className="hotel-card-address">{hotel.address}</div>
        <div className="hotel-card-price">₹{hotel.price}</div>

        <div className="hotel-card-actions">
          <button className="hotel-card-edit-btn" onClick={handleEdit}>
            Edit
          </button>
          <button className="hotel-card-delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
