import axios from "../api/axios.js";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditHotel.css"; // ✅ Import your CSS file

export default function EditHotel() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");

  const fetchHotel = async (hotelId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/hotels/${hotelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.hotel;
      setName(data.name || "");
      setAddress(data.address || "");
      setPrice(data.price || "");
      setImage(data.image || "");
      setDescription(data.description || "");
      setCity(data.city || "");
      setLandmark(data.landmark || "");
    } catch (error) {
      console.error("Error fetching hotel details:", error);
    }
  };

  useEffect(() => {
    fetchHotel(id);
  }, []);

  const handleEditBtn = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("Token is missing.");

      await axios.post(
        `/hotels/${id}`,
        {
          name,
          address,
          price,
          image,
          description,
          city,
          landmark,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/myhotels");
    } catch (error) {
      console.error("Error editing hotel:", error);
    }
  };

  return (
    <div className="edit-hotel-container">
      <form className="edit-hotel-form" onSubmit={handleEditBtn}>
        <h2 className="form-title">Edit Hotel</h2>

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter hotel name"
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter hotel description"
        ></textarea>

        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter hotel address"
        />

        <label>City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />

        <label>Landmark</label>
        <input
          type="text"
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
          placeholder="Enter nearby landmark"
        />

        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
        />
        {/* 
        <label>Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter image URL"
        /> */}

        <button type="submit">Edit Hotel</button>
      </form>
    </div>
  );
}
