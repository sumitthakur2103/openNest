import React, { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/HotelLocationMap.css";

const HotelLocationMap = ({ formData, setFormData, handleAddBtn }) => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  const [coordinates, setCoordinates] = useState(null);
  const [marker, setMarker] = useState(null);
  const [showLocationBtn, setShowLocationBtn] = useState(true);

  function toFourDecimalPlaces(num) {
    return parseFloat(num.toFixed(4));
  }

  const updateCoordinates = (lng, lat) => {
    setFormData((prev) => ({
      ...prev,
      coordinates: { lng, lat },
    }));
    setCoordinates([
      `Longitude: ${toFourDecimalPlaces(lng)}`,
      `Latitude: ${toFourDecimalPlaces(lat)}`,
    ]);
  };

  const findCityCoordinates = async (cityName) => {
    try {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          cityName
        )}.json`,
        {
          params: {
            access_token: mapboxgl.accessToken,
          },
          withCredentials: false,
        }
      );
      const [lng, lat] = res.data.features[0].center;
      updateCoordinates(lng, lat);
    } catch (error) {
      console.error("Error fetching city coordinates:", error);
    }
  };

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    const city = formData.city || "Gwalior";
    if (!formData.coordinates) {
      findCityCoordinates(city);
    }

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center: formData.coordinates
        ? [formData.coordinates.lng, formData.coordinates.lat]
        : [79, 21],
      zoom: 13,
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (formData.coordinates && mapRef.current) {
      mapRef.current.setCenter([
        formData.coordinates.lng,
        formData.coordinates.lat,
      ]);

      if (marker) {
        marker.remove();
      }

      const newMarker = new mapboxgl.Marker({ draggable: true })
        .setLngLat([formData.coordinates.lng, formData.coordinates.lat])
        .addTo(mapRef.current);

      newMarker.on("dragend", () => {
        const lngLat = newMarker.getLngLat();
        updateCoordinates(lngLat.lng, lngLat.lat);
      });

      setMarker(newMarker);
    }
  }, [formData.coordinates]);

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

  return (
    <div className="map-wrapper">
      <div ref={mapContainerRef} id="map" />

      {coordinates && (
        <div className="map-coordinates">
          {coordinates.map((coord, idx) => (
            <p key={idx} style={{ margin: 0 }}>
              {coord}
            </p>
          ))}
        </div>
      )}

      {showLocationBtn ? (
        <>
          <button
            className="map-button"
            id="use-current-location"
            onClick={handleCurrentLocationBtn}
          >
            Use My Current Location
          </button>
          <button
            className="map-button"
            id="use-this-location"
            onClick={handleAddBtn}
          >
            Use This Location
          </button>
        </>
      ) : (
        <button
          className="map-button"
          id="confirm-location"
          onClick={handleAddBtn}
        >
          Confirm Location
        </button>
      )}
    </div>
  );
};

export default HotelLocationMap;
