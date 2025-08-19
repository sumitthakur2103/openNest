import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/CurrentLocationMap.css"; // Ensure you have the correct styles for the map and markers

const CurrentLocationMap = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [coordinates, setCoordinates] = useState(null);
  const [showLocationBtn, setShowLocationBtn] = useState(true);
  const [showFindHotelsBtn, setShowFindHotelsBtn] = useState(false); // New state
  const [nearbyHotels, setNearbyHotels] = useState([]);
  const [closeBtn, setCloseBtn] = useState(false); // New state for close button

  const navigate = useNavigate();
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11", // Fixed: working Mapbox style
      center: [0, 0],
      zoom: 2,
    });

    markerRef.current = new mapboxgl.Marker({ draggable: true })
      .setLngLat([0, 0])
      .addTo(mapRef.current);

    markerRef.current.on("dragend", () => {
      const lngLat = markerRef.current.getLngLat();
      updateCoordinates(lngLat.lng, lngLat.lat);
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  function toFourDecimalPlaces(num) {
    return parseFloat(num.toFixed(4));
  }

  const updateCoordinates = (lng, lat) => {
    const lngFixed = toFourDecimalPlaces(lng);
    const latFixed = toFourDecimalPlaces(lat);
    setCoordinates([`Longitude: ${lngFixed}`, `Latitude: ${latFixed}`]);

    if (markerRef.current && mapRef.current) {
      console.log("Mapref", mapRef.current);
      markerRef.current.setLngLat([lng, lat]);
      mapRef.current.flyTo({ center: [lng, lat], zoom: 14 });
    }
  };

  const handleCurrentLocationBtn = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setShowLocationBtn(false);
          setShowFindHotelsBtn(true); // Show 'Find Hotels Nearby' button after location is set
          updateCoordinates(longitude, latitude);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  };

  const handleClick = (id) => {
    navigate(`/hotel/${id}`);
  };

  const findHotels = async () => {
    try {
      document.querySelector("#map").classList.add("disable");
      const { lng, lat } = markerRef.current.getLngLat();
      const lngFixed = toFourDecimalPlaces(lng);
      const latFixed = toFourDecimalPlaces(lat);
      setShowFindHotelsBtn(false); // Hide button once location is set

      const response = await axios.get("/hotels/getHotelsFromCoordinates", {
        params: { lng: lngFixed, lat: latFixed },
      });

      console.log("Hotels found:", response.data);
      const hotels = response.data.hotels;

      if (hotels.length > 0) {
        setNearbyHotels(hotels);

        for (const hotel of hotels) {
          const markerEl = document.createElement("div");
          markerEl.className = "hotel-marker-wrapper";

          const iconEl = document.createElement("div");
          iconEl.className = "hotel-marker";

          const tailEl = document.createElement("div");
          tailEl.className = "marker-tail";

          markerEl.appendChild(iconEl);
          markerEl.appendChild(tailEl);

          // animation style
          const style = document.createElement("style");
          style.textContent = `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `;
          document.head.appendChild(style);

          const marker = new mapboxgl.Marker(markerEl)
            .setLngLat([
              hotel.coordinates.coordinates[0],
              hotel.coordinates.coordinates[1],
            ])
            .addTo(mapRef.current);

          marker.getElement().addEventListener("mouseover", () => {
            const popup = new mapboxgl.Popup().setHTML(`
            <div style="background-color: white; padding: 10px; border-radius: 5px;">
              <img src="${hotel.images[0]}" alt="${hotel.name}" />
              <h3 style="color:black; font-weight: bold; margin: 5px 0;">${hotel.name}</h3>
              <p style="color:black; margin-bottom: 5px;">${hotel.description}</p>
              <p style="color:black; margin-bottom: 5px;">Price: ${hotel.price} &#8377;/night</p>
            </div>
          `);
            marker.setPopup(popup);
            popup.addTo(mapRef.current);
          });

          marker.getElement().addEventListener("mouseout", () => {
            marker.setPopup(null);
          });

          marker.getElement().addEventListener("click", () => {
            handleClick(hotel._id);
          });
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("No hotels found nearby (404).");
        document.querySelector("#map").classList.remove("disable");
        alert("No hotels found nearby 🚫");
        navigate("/");
      } else {
        console.error("Error fetching hotels:", error.message);
        document.querySelector("#map").classList.remove("disable");
        alert("Something went wrong. Please try again later.");
        navigate("/");
      }
    }
  };

  return (
    <>
      <div
        ref={mapContainerRef}
        id="map"
        style={{ height: "500px", width: "100%" }}
      ></div>

      <div
        className="map-coordinates"
        style={{ display: coordinates ? "block" : "none" }}
      >
        {coordinates &&
          coordinates.map((coord, index) => (
            <p key={index} style={{ margin: 0 }}>
              {coord}
            </p>
          ))}
      </div>

      {/* Buttons */}
      <div className="map-button-container">
        {showLocationBtn && (
          <button
            onClick={handleCurrentLocationBtn}
            className="map-btn get-location-btn"
          >
            Get Current Location
          </button>
        )}

        {showFindHotelsBtn && (
          <button onClick={findHotels} className="map-btn get-coordinates-btn">
            Find Hotels Nearby
          </button>
        )}
      </div>
      {nearbyHotels.length > 0 && (
        <div className={`hotel-card-container-overlay slide-up`}>
          <button
            className="close-hotels-btn"
            onClick={() => {
              setNearbyHotels([]);
              setShowFindHotelsBtn(true);
              document.querySelector("#map").classList.remove("disable");
            }}
          >
            &times;
          </button>
          <h3
            style={{
              marginBottom: "1rem",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Nearby Hotels
          </h3>
          <div className="hotel-cards">
            {nearbyHotels.map((hotel) => (
              <div
                className="hotel-card"
                key={hotel._id}
                onClick={() => handleClick(hotel._id)}
              >
                <img src={hotel.images[0]} alt={hotel.name} />
                <div className="hotel-card-content">
                  <h4>{hotel.name}</h4>
                  <p>{hotel.description.slice(0, 80)}...</p>
                  <p style={{ fontWeight: "bold", color: "#ffd700 " }}>
                    Price: {hotel.price} &#8377;/night
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentLocationMap;
