import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios.js";
import "../styles/ViewHotel.css";
import { useNavigate } from "react-router-dom";
import { all } from "axios";
import Hotel from "../../../backend/models/hotel.js";

export default function ViewHotel() {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestDetails, setGuestDetails] = useState([{ name: "", age: "" }]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [allowed, setAllowed] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    if (!hotelDetails?.images?.length) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === hotelDetails.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    if (!hotelDetails?.images?.length) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? hotelDetails.images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`/hotels/${hotelId}`);
        const userId = JSON.parse(localStorage.getItem("user"))._id;

        setHotelDetails(response.data.hotel);
        if (response.data.hotel.owner === userId) {
          setAllowed(false);
        }
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };
    if (hotelId) {
      fetchHotelDetails();
    }
  }, [hotelId]);

  const handleFormOpen = () => {
    if (allowed) {
      document
        .querySelector(".hotel-details-container")
        .classList.add("disable");
      setOpenForm(true);
    } else {
      alert("You are not allowed to book this hotel.");
    }
  };

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
    setGuestDetails([...guestDetails, { name: "", age: "" }]);
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

    const formattedGuests = guestDetails.map((g) => ({
      name: g.name,
      age: parseInt(g.age),
    }));

    const bookingData = {
      hotelId,
      checkInDate,
      checkOutDate,
      totalPrice: price,
      guestDetails: formattedGuests,
    };

    try {
      const token = localStorage.getItem("token");

      // 1. Create Razorpay Order
      const razorpayOrder = await axios.post(
        "/payments/create-order",
        {
          amount: price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.data.amount,
        currency: "INR",
        name: "OpenNest Hotel Booking",
        description: "Room Booking",
        order_id: razorpayOrder.data.id,
        handler: async function (response) {
          // 3. On success, send booking + payment info to backend
          try {
            await axios.post(
              "/bookings/bookNewRoom",
              {
                hotelId,
                checkInDate,
                checkOutDate,
                totalPrice: price,
                guestDetails: formattedGuests,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            alert("Booking successful!");

            navigate("/mybookings");

            setOpenForm(false);
          } catch (err) {
            alert("Booking failed: " + err.message);
          }
        },
        prefill: {
          name: JSON.parse(localStorage.getItem("user")).name,
          email: JSON.parse(localStorage.getItem("user")).email,
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

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
          <>
            <img
              src={
                hotelDetails.images?.[currentImageIndex] || "/placeholder.jpg"
              }
              alt={hotelDetails.name}
              className="hotel-image"
            />

            <div className="image-nav-buttons">
              <button onClick={handlePrevImage}>⟵ Prev</button>
              <button onClick={handleNextImage}>Next ⟶</button>
            </div>
          </>
        </div>
        <div className="hotel-info-section">
          <h2 className="hotel-name">{hotelDetails.name}</h2>
          <p className="hotel-description">{hotelDetails.description}</p>
          <p className="hotel-address">📍 {hotelDetails.address}</p>
          <p className="hotel-city">🏙️ {hotelDetails.city}</p>
          <p className="hotel-landmark">📌 Landmark: {hotelDetails.landmark}</p>
          <p className="hotel-price">💸 Price: ₹{hotelDetails.price}/night</p>
          <button className="book-button" onClick={handleFormOpen}>
            Book This Room
          </button>
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
                  onChange={(e) =>
                    handleGuestChange(index, "name", e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={guest.age}
                  onChange={(e) =>
                    handleGuestChange(index, "age", e.target.value)
                  }
                  required
                />
                {guestDetails.length > 1 && (
                  <button type="button" onClick={() => removeGuest(index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addGuest}>
              Add Guest
            </button>

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
          <button
            className="close-button"
            onClick={() => {
              setOpenForm(false);
              document
                .querySelector(".hotel-details-container")
                .classList.remove("disable");
            }}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
