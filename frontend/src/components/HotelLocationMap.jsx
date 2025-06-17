import React, { useEffect, useRef, useState } from 'react';
import axios from '../api/axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(cityName)}.json`,
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
            console.error('Error fetching city coordinates:', error);
        }
    };

    useEffect(() => {
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

        const city = formData.city || 'Gwalior';
        if (!formData.coordinates) {
            findCityCoordinates(city);
        }

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/standard',
            center: formData.coordinates ? [formData.coordinates.lng, formData.coordinates.lat] : [79, 21],
            zoom: 13,
        });

        return () => {
            mapRef.current.remove();
        };
    }, []);

    useEffect(() => {
        if (formData.coordinates && mapRef.current) {
            mapRef.current.setCenter([formData.coordinates.lng, formData.coordinates.lat]);

            if (marker) {
                marker.remove();
            }

            const newMarker = new mapboxgl.Marker({ draggable: true })
                .setLngLat([formData.coordinates.lng, formData.coordinates.lat])
                .addTo(mapRef.current);

            newMarker.on('dragend', () => {
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
                    console.error('Error getting current location:', error);
                }
            );
        }
    };

    return (
        <>
            <div ref={mapContainerRef} id="map" style={{ height: '300px' }}></div>

            <div
                style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: '#fff',
                    position: 'absolute',
                    bottom: '40px',
                    left: '10px',
                    padding: '5px 10px',
                    margin: 0,
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    lineHeight: '18px',
                    borderRadius: '3px',
                    display: coordinates ? 'block' : 'none',
                }}
            >
                {coordinates?.map((coord, idx) => (
                    <p key={idx} style={{ margin: 0 }}>
                        {coord}
                    </p>
                ))}
            </div>

            {showLocationBtn ? (
                <button
                    onClick={handleCurrentLocationBtn}
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Use my current location
                </button>
            ) : (
                <button
                    onClick={handleAddBtn}
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Confirm Address
                </button>
            )}
        </>
    );
};

export default HotelLocationMap;
