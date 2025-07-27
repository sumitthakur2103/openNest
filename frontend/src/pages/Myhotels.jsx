import React, { useEffect, useState } from "react";
import axios from "../api/axios.js";
import { Link } from "react-router-dom";
import Hotelcard from "../components/Hotelcard.jsx";
import "../styles/Myhotels.css"; // 💅 CSS

export default function Myhotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("/hotels/getMyHotels", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHotels(response.data.hotels);
      } catch (error) {
        console.error("Error fetching my hotels:", error.message);
      }
    };
    fetchHotels();
  }, []);

  const onDelete = (hotelId) => {
    setHotels((prevHotels) =>
      prevHotels.filter((hotel) => hotel._id !== hotelId)
    );
  };

  return (
    <div className="myhotels-wrapper">
      <h2 className="myhotels-title">My Hotels</h2>

      <div className="hotel-container">
        {hotels.length === 0 ? (
          <p className="no-hotels">No hotels found</p>
        ) : (
          hotels.map((hotel) => (
            <Hotelcard key={hotel._id} hotel={hotel} onDelete={onDelete} />
          ))
        )}
      </div>

      <Link to="/addNewHotel" className="add-hotel-link">
        <button className="add-hotel-button">Add a New Hotel</button>
      </Link>
    </div>
  );
}
