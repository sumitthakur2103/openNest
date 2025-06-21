import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../api/axios.js";
import "../styles/ViewHotel.css";

export default function ViewHotel() {
    const { hotelId } = useParams();
    const [hotelDetails, setHotelDetails] = useState(null);
    const [openForm, setOpenForm] = useState(false);

    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guestDetails, setGuestDetails] = useState([
        { name: '', age: '' }
    ]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchHotelDetails = async () => {
            try {
                const response = await axios.get(`/hotels/${hotelId}`);
                setHotelDetails(response.data.hotel);
            } catch (error) {
                console.error("Error fetching hotel details:", error);
            }
        };
        if (hotelId) {
            fetchHotelDetails();
        }
    }, [hotelId]);

    const calculateNights = (checkIn, checkOut) => {
        const inDate = new Date(checkIn);
        const outDate = new Date(checkOut);
        const diffTime = outDate - inDate;
        const nights = diffTime / (1000 * 60 * 60 * 24);
        return nights > 0 ? nights : 0;
    };

    const handleGuestChange = (index, field, value) => {
        const updatedGuests = [...guestDetails];
        updatedGuests[index][field] = value;
        setGuestDetails(updatedGuests);
    };

    const addGuest = () => {
        setGuestDetails([...guestDetails, { name: '', age: '' }]);
    };

    const removeGuest = (index) => {
        const updatedGuests = [...guestDetails];
        updatedGuests.splice(index, 1);
        setGuestDetails(updatedGuests);
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        const nights = calculateNights(checkInDate, checkOutDate);
        const price = nights * hotelDetails.price;
        setTotalPrice(price);

        const formattedGuests = guestDetails.map(g => ({
            name: g.name,
            age: parseInt(g.age)
        }));

        const bookingData = {
            hotelId,
            checkInDate,
            checkOutDate,
            totalPrice: price,
            guestDetails: formattedGuests
        };

        try {
            const token = localStorage.getItem('token');
            await axios.post('/bookings/bookNewRoom', bookingData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Booking successful!");
            setOpenForm(false);
        } catch (err) {
            alert("Booking failed: " + (err.response?.data?.message || err.message));
        }
    };

    if (!hotelDetails) return <p className="loading">Loading hotel details...</p>;

    return (
        <>
            <div className="hotel-details-container">
                <div className="hotel-image-section">
                    <img
                        src={hotelDetails.images?.[0] || "/placeholder.jpg"}
                        alt={hotelDetails.name}
                        className="hotel-image"
                    />
                </div>
                <div className="hotel-info-section">
                    <h2 className="hotel-name">{hotelDetails.name}</h2>
                    <p className="hotel-description">{hotelDetails.description}</p>
                    <p className="hotel-address">📍 {hotelDetails.address}</p>
                    <p className="hotel-city">🏙️ {hotelDetails.city}</p>
                    <p className="hotel-landmark">📌 Landmark: {hotelDetails.landmark}</p>
                    <p className="hotel-price">💸 Price: ₹{hotelDetails.price}/night</p>
                    <button className="book-button" onClick={() => setOpenForm(true)}>Book This Room</button>
                </div>
            </div>

            {openForm && (
                <div className="booking-form">
                    <h3>Booking Form</h3>
                    <form onSubmit={handleBookingSubmit}>
                        {guestDetails.map((guest, index) => (
                            <div key={index} style={{ marginBottom: "10px" }}>
                                <input
                                    type="text"
                                    placeholder={`Guest ${index + 1} Name`}
                                    value={guest.name}
                                    onChange={(e) => handleGuestChange(index, "name", e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Age"
                                    value={guest.age}
                                    onChange={(e) => handleGuestChange(index, "age", e.target.value)}
                                    required
                                />
                                {guestDetails.length > 1 && (
                                    <button type="button" onClick={() => removeGuest(index)}>Remove</button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={addGuest}>Add Guest</button>

                        <input
                            type="date"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            required
                        />
                        <input
                            type="date"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            required
                        />
                        <button type="submit">Confirm Booking</button>
                    </form>
                    <button className="close-button" onClick={() => setOpenForm(false)}>Close</button>
                </div>
            )}
        </>
    );
}
