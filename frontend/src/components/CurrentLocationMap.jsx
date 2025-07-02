import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const CurrentLocationMap = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [coordinates, setCoordinates] = useState(null);
  const [showLocationBtn, setShowLocationBtn] = useState(true);

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
      const { lng, lat } = markerRef.current.getLngLat();
      const lngFixed = toFourDecimalPlaces(lng);
      const latFixed = toFourDecimalPlaces(lat);

      const response = await axios.get("/hotels/getHotelsFromCoordinates", {
        params: { lng: lngFixed, lat: latFixed },
      });
      console.log("Hotels found:", response.data);
      const hotels = response.data.hotels;

      if (hotels.length > 0) {
        for (const hotel of hotels) {
          const markerEl = document.createElement("div");
          markerEl.className = "hotel-marker-wrapper";

          const iconEl = document.createElement("div");
          iconEl.className = "hotel-marker";

          const tailEl = document.createElement("div");
          tailEl.className = "marker-tail";

          markerEl.appendChild(iconEl);
          markerEl.appendChild(tailEl);

          const marker = new mapboxgl.Marker(markerEl)
            .setLngLat([
              hotel.coordinates.coordinates[0],
              hotel.coordinates.coordinates[1],
            ])
            .addTo(mapRef.current);
          marker.getElement().addEventListener("mouseover", () => {
            const popup = new mapboxgl.Popup().setHTML(`
              <h3>${hotel.name}</h3>
              <p>${hotel.description}</p>
              <img src="${hotel.images[0]}" alt="${hotel.name}" />
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
      console.error("Error fetching hotels:", error);
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
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          position: "absolute",
          bottom: "40px",
          left: "10px",
          padding: "5px 10px",
          fontFamily: "monospace",
          fontWeight: "bold",
          fontSize: "11px",
          lineHeight: "18px",
          borderRadius: "3px",
          display: coordinates ? "block" : "none",
        }}
      >
        {coordinates &&
          coordinates.map((coord, index) => (
            <p key={index} style={{ margin: 0 }}>
              {coord}
            </p>
          ))}
      </div>
      <button
        onClick={findHotels}
        style={{
          position: "absolute",
          bottom: "10px",
          left: "180px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Get Marker Coordinates
      </button>
      {showLocationBtn && (
        <button
          onClick={handleCurrentLocationBtn}
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Get Current Location
        </button>
      )}
    </>
  );
};

export default CurrentLocationMap;
