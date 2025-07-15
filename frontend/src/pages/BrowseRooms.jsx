import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrentLocationMap from "../components/CurrentLocationMap";
import "../styles/BrowseRooms.css";

export default function BrowseRooms() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [openMap, setOpenMap] = useState(false);

  const handleCity = (e) => {
    e.preventDefault();
    navigate(`/hotels/${city}`);
  };

  const handleMap = () => {
    setOpenMap(true);
  };

  return (
    <div className="browse-container">
      <h1 className="browse-heading">Find Your Perfect Stay</h1>

      {!openMap ? (
        <div className="browse-options">
          <button className="primary-btn" onClick={handleMap}>
            Use My Current Location
          </button>
          <p className="divider-text">or</p>
          <form className="city-form" onSubmit={handleCity}>
            <input
              className="city-input"
              type="text"
              placeholder="Enter a city name"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button className="search-btn" type="submit">
              Search Hotels
            </button>
          </form>
        </div>
      ) : (
        <CurrentLocationMap />
      )}
    </div>
  );
}
