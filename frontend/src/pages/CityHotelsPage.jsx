import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../api/axios.js";
import { useNavigate } from 'react-router-dom';
export default function CityHotelsPage() {
    const { city } = useParams();
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);

    const fetchHotels = async (city) => {
        try {
            const response = await axios.get(`/hotels/city/${city}`)
            const hotels = response.data.hotels;
            console.log("Hotels in city:", hotels);
            setHotels(hotels);
        } catch (error) {
            console.error("Error fetching hotels:", error);
        }
    }
    useEffect(() => {
        if (city) {
            fetchHotels(city);
        } else {
            console.error("City parameter is missing.");
        }
    }, []);


    return (
        <>
            <h2>Hotels in {city}</h2>
            <div className="hotel-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {
                    hotels.length === 0 ? <p>No hotels found in {city}</p> :
                        hotels.map(hotel => (
                            <div key={hotel._id} className="hotel-card">
                                <h3>{hotel.name}</h3>
                                <p>{hotel.address}</p>
                                <p>Price: ${hotel.price}</p>
                                <img src={hotel.images?.[0]} alt={hotel.name} style={{ width: '200px', height: '150px' }} />
                                <p>{hotel.description}</p>
                                <p>Landmark: {hotel.landmark}</p>
                                <button onClick={()=>{
                                    navigate(`/hotel/${hotel._id}`); // Navigate to hotel details page
                                }}>Book Hotel</button>
                            </div>
                        ))
                }
            </div>
        </>
    )
}
