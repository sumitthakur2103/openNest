import React from "react";
import "../styles/FeatureSection.css";
import FeatureSectionCard1 from "./FeatureSectionCard1.jsx";
import featureCard from "../assets/featureCard.png";
export default function FeatureSection() {
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
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1e1e19",
          }}
        >
          <div>
            <FeatureSectionCard1
              icon={featureCard}
              title="Seamless Booking Experience at Your Fingertips"
              subtitle="Book your next getaway in just a few clicks."
            />
          </div>
          <div>
            <FeatureSectionCard1
              icon={featureCard}
              title="A Diverse Range of Hotels Await You"
              subtitle="Explore hotels, homestays, and other one-of-a-kind stays."
            />
          </div>
          <div>
            <FeatureSectionCard1
              icon={featureCard}
              title="Unbeatable Offers and Discounts Just for You"
              subtitle="Save more with our exclusive deals and promotions."
            />
          </div>
        </div>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </>
  );
}
