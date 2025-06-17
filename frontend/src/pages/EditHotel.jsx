import axios from '../api/axios.js';
import React, { use, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HotelLocationMap from '../components/HotelLocationMap.jsx';
export default function EditHotel() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [landmark, setLandmark] = useState('');

    const fetchHotel = async (hotelId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`/hotels/${hotelId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data.hotel;
            setName(data.name || '');
            setAddress(data.address || '');
            setPrice(data.price || '');
            setImage(data.image || '');
            setDescription(data.description || '');
            setCity(data.city || '');
            setLandmark(data.landmark || '');
        } catch (error) {
            console.error("Error fetching hotel details:", error);
        }
    };


    useEffect(() => {
        fetchHotel(id);
    }, []);


    const handleEditBtn = async (e) => {
        try {
            e.preventDefault();
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token is missing.");
                return;
            }
            const res = await axios.post(`/hotels/${id}`, {
                name,
                address,
                price,
                image,
                description,
                city,
                landmark
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data);
            setName('');
            setAddress('');
            setPrice('');
            setImage('');
            setDescription('');
            setCity('');
            setLandmark('');
            navigate('/myhotels'); // Redirect to My Hotels page after editing the hotel
        } catch (error) {
            console.error("Error editing hotel:", error);
        }
    }
    return (
        <>
            <div className='edit-hotel-container'>
                <form onSubmit={handleEditBtn}>
                    <input type="text" placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                    <textarea placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                    <input type="text" placeholder='Address' value={address} onChange={(e) => { setAddress(e.target.value) }} />
                    
                    <input type="text" placeholder='City' value={city} onChange={(e) => { setCity(e.target.value) }} />
                    <input type="text" placeholder='Landmark' value={landmark} onChange={(e) => { setLandmark(e.target.value) }} />

                    <input type="number" placeholder='Price' value={price} onChange={(e) => { setPrice(e.target.value) }} />
                    <input type="text" placeholder='Image' value={image} onChange={(e) => { setImage(e.target.value) }} />

                    <button type='submit'>Edit Hotel</button>
                </form>
            </div>
        </>
    )
}
