import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios.js";
import "../styles/CityHotelsPage.css"; // ✅ Add this line

export default function CityHotelsPage() {
  const { city } = useParams();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async (city) => {
    try {
      const response = await axios.get(`/hotels/city/${city}`);
      setHotels(response.data.hotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    if (city) fetchHotels(city);
  }, []);

  return (
    <div className="city-hotels-page">
      <h2 className="city-title">
        Hotels in <span>{city}</span>
      </h2>
      <div className="hotel-container">
        {hotels.length === 0 ? (
          <p>No hotels found in {city}</p>
        ) : (
          hotels.map((hotel) => (
            <div key={hotel._id} className="hotel-card">
              <img
                src={hotel.images?.[0]}
                alt={hotel.name}
                className="hotel-image"
              />
              <h3>{hotel.name}</h3>
              <p>{hotel.address}</p>
              <p className="price">Price: ${hotel.price}</p>
              <p>{hotel.description}</p>
              <p className="landmark">Landmark: {hotel.landmark}</p>
              <button
                className="book-button"
                onClick={() => navigate(`/hotel/${hotel._id}`)}
              >
                Book Hotel
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
