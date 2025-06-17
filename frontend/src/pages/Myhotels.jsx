import React, { use } from 'react'
import { useState, useEffect, useContext } from 'react';
import axios from "../api/axios.js";
import { Link } from 'react-router-dom';
import Hotelcard from '../components/Hotelcard.jsx';


export default function Myhotels() {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("/hotels/getMyHotels", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = response.data.hotels;
                setHotels(data);
                // console.log("My Hotels:", data);
                // setHotels(data);
            } catch (error) {
                console.error("Error fetching my hotels:", error.message);
            }
        }
        fetchHotels();
    }, []);

    const onDelete = (hotelId) => {
        setHotels(prevHotels => prevHotels.filter(hotel => hotel._id !== hotelId));
    }
    return (
        <div>
            <h2>Myhotels</h2>
            <div className="hotel-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {
                    hotels.length === 0 ? <p>No hotels found</p> :
                        hotels.map(hotel => (
                            <Hotelcard key={hotel._id} hotel={hotel} onDelete={onDelete}></Hotelcard>
                        ))
                }
            </div>

            <Link to="/addNewHotel">
                <button>Add a New Hotel</button>

            </Link>


        </div>)
}
