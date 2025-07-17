import axios from "../api/axios.js";
import { useEffect, useState } from "react";
import "../styles/MyBookings.css"; // 👈 Import CSS

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("/bookings/getMyBookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(response.data.bookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
      <h2>My Bookings</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div className="booking-container">
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <h3>{booking.hotelId?.name || "Unknown Hotel"}</h3>
                <p>
                  <strong>Address:</strong> {booking.hotelId?.address || "N/A"}
                </p>
                <p>
                  <strong>Price:</strong> ₹{booking.hotelId?.price || "N/A"}
                </p>
                {booking.hotelId?.images?.[0] && (
                  <img
                    src={booking.hotelId.images[0]}
                    alt={booking.hotelId.name}
                  />
                )}
                <p>
                  <strong>Check-in:</strong>{" "}
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Check-out:</strong>{" "}
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Guests:</strong>{" "}
                  {booking.guestDetails.map((guest, index) => (
                    <span key={index}>
                      {guest.name} ({guest.age})
                      {index < booking.guestDetails.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <p>
                  <strong>Total Price:</strong> ₹{booking.totalPrice}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}
