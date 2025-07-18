import React from "react";
import "../styles/FeatureSection.css";
import FeatureSectionCard1 from "./FeatureSectionCard1.jsx";
import featureCard from "../assets/featureCard.png";
import FeatureSectionCard2 from "./featureSectionCard2.jsx";
import featureCard2_1 from "../assets/featureCard2-1.jpg";
import featureCard2_2 from "../assets/featureCard2-2.jpg";
import featureCard2_3 from "../assets/featureCard2-3.jpg";
import featureCard4_1 from "../assets/featureCard4-1.jpg";
import featureCard3_1 from "../assets/featureCard3-1.jpg";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
export default function FeatureSection() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (user) {
      navigate("/book-a-room");
    } else {
      navigate("/auth");
    }
  };
  return (
    <>
      <div>
        <div className="feature-content">
          <h2 className="feature-title">
            Discover Affordable Stays Tailored For You
          </h2>
          <p className="feature-description">
            Find budget-friendly accommodations that suit your style and needs.
            Our platform simplifies the booking process, making it quick and
            hassle-free.
          </p>
        </div>
        <div className="feature-card-row">
          <FeatureSectionCard1
            icon={featureCard}
            title="Seamless Booking Experience at Your Fingertips"
            subtitle="Book your next getaway in just a few clicks."
          />
          <FeatureSectionCard1
            icon={featureCard}
            title="A Diverse Range of Hotels Await You"
            subtitle="Explore hotels, homestays, and other one-of-a-kind stays."
          />
          <FeatureSectionCard1
            icon={featureCard}
            title="Unbeatable Offers and Discounts Just for You"
            subtitle="Save more with our exclusive deals and promotions."
          />
        </div>
      </div>

      <div>
        <div className="feature-content">
          <h2 className="feature-title">Discover How Easy It Is to Book</h2>
          <p className="feature-description">
            Searching for the perfect property is a breeze. With just a few
            clicks, you can find and book budget-friendly hotels or rooms that
            suit your needs.
          </p>
        </div>
        <div className="feature-card2-row">
          <FeatureSectionCard2
            image={featureCard2_1}
            title="Smart Hotel Search"
            subtitle="Search nearby hotels using your current location or simply enter a city name."
          />
          <FeatureSectionCard2
            image={featureCard2_2}
            title="Easy Booking Form"
            subtitle="Select your stay and fill in a quick form with your details — no hassle."
          />
          <FeatureSectionCard2
            image={featureCard2_3}
            title="Secure Online Payment"
            subtitle="Pay instantly through Razorpay and get your booking confirmed in seconds."
          />
        </div>
      </div>

      <div className="feature-split-section">
        <div className="feature-split-img">
          <img src={featureCard3_1} alt="booking" />
        </div>

        <div className="feature-split-text">
          <p>Discover</p>
          <h1>
            Experience Hassle-Free <br /> Travel and Accommodation
          </h1>
          <p className="desc">
            Our platform simplifies hotel booking for guests and empowers
            property owners to reach a wider audience. Enjoy a seamless
            experience with trust signals like verified reviews and badges.
          </p>

          <div className="feature-split-columns">
            <div>
              <h3>Easy</h3>
              <p>Book your stay in just a few clicks!</p>
            </div>
            <div>
              <h3>Reliable</h3>
              <p>Join a community of satisfied travelers and hosts.</p>
            </div>
          </div>

          <div className="feature-split-buttons">
            {user ? (
              <>
                <button
                  className="btn-outline-white"
                  onClick={() => navigate("/book-a-room")}
                >
                  Book Now
                </button>
                <button className="btn-filled-white">Learn More &rarr;</button>
              </>
            ) : (
              <>
                <button
                  className="btn-outline-white"
                  onClick={() => navigate("/auth")}
                >
                  Join
                </button>
                <button className="btn-filled-white">Learn More &rarr;</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="feature-callout">
        <h1>
          Book Your Stay <br /> Join Our Team
        </h1>
        <p>
          Discover amazing places to stay and unlock exclusive benefits by
          partnering with us today!
        </p>
        <div className="feature-callout-buttons">
          <button className="filled" onClick={handleBookNow}>
            Book Now
          </button>
          {user ? (
            <></>
          ) : (
            <>
              <button className="outline" onClick={() => navigate("/auth")}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      <div className="feature-final">
        <div className="feature-final-text">
          <p style={{ fontSize: "16px", color: "#ccc" }}>Stay</p>
          <h1>
            Affordable Comfort for <br /> Every Traveler
          </h1>
          <p>
            At our hotel booking platform, we believe that quality accommodation
            should be accessible to everyone. Our mission is to connect
            travelers with budget-friendly options that don't compromise on
            comfort.
          </p>
          <div className="feature-final-buttons">
            <button className="btn-outline-white">Learn More</button>
            <button
              className="btn-filled-white"
              style={{
                background: "transparent",
                color: "white",
                border: "none",
                textDecoration: "underline",
              }}
            >
              Join Us &rarr;
            </button>
          </div>
        </div>

        <div className="feature-final-image">
          <img src={featureCard4_1} alt="Comfortable Stay" />
        </div>
      </div>
    </>
  );
}
