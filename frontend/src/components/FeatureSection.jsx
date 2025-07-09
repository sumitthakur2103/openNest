// import React from "react";
// import "../styles/FeatureSection.css";
// import FeatureSectionCard1 from "./FeatureSectionCard1.jsx";
// import featureCard from "../assets/featureCard.png";
// import FeatureSectionCard2 from "./featureSectionCard2.jsx";
// import featureCard2_1 from "../assets/featureCard2-1.jpg";
// import featureCard2_2 from "../assets/featureCard2-2.jpg";
// import featureCard2_3 from "../assets/featureCard2-3.jpg";
// import featureCard4_1 from "../assets/featureCard4-1.jpg";

// import featureCard3_1 from "../assets/featureCard3-1.jpg";
// import featureCard3_2 from "../assets/featureCard3-2.jpg";
// import FAQSection from "./FAQSection.jsx";
// export default function FeatureSection() {
//   return (
//     <>
//       <div>
//         <div className="feature-content">
//           <h2 className="feature-title">
//             Discover Affordable Stays Tailored For You
//           </h2>
//           <p className="feature-description">
//             Find budget-friendly accommodations that suit your style and needs.
//             Our platform simplifies the booking process, making it quick and
//             hassle-free.
//           </p>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             gap: "20px",
//             flexDirection: "row",
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "#1e1e19",
//           }}
//         >
//           <div>
//             <FeatureSectionCard1
//               icon={featureCard}
//               title="Seamless Booking Experience at Your Fingertips"
//               subtitle="Book your next getaway in just a few clicks."
//             />
//           </div>
//           <div>
//             <FeatureSectionCard1
//               icon={featureCard}
//               title="A Diverse Range of Hotels Await You"
//               subtitle="Explore hotels, homestays, and other one-of-a-kind stays."
//             />
//           </div>
//           <div>
//             <FeatureSectionCard1
//               icon={featureCard}
//               title="Unbeatable Offers and Discounts Just for You"
//               subtitle="Save more with our exclusive deals and promotions."
//             />
//           </div>
//         </div>
//       </div>
//       <div>
//         <div className="feature-content">
//           <h2 className="feature-title">Discover How Easy It Is to Book</h2>
//           <p className="feature-description">
//             Searching for the perfect property is a breeze. With just a few
//             clicks, you can find and book budget-friendly hotels or rooms that
//             suit your needs.
//           </p>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             gap: "20px",
//             flexDirection: "row",
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "#1e1e19",
//             paddingBottom: "2rem",
//           }}
//         >
//           <div>
//             <FeatureSectionCard2
//               image={featureCard2_1}
//               title="Smart Hotel Search"
//               subtitle="Search nearby hotels using your current location or simply enter a city name."
//             />
//           </div>
//           <div>
//             <FeatureSectionCard2
//               image={featureCard2_2}
//               title="Easy Booking Form"
//               subtitle="Select your stay and fill in a quick form with your details — no hassle."
//             />
//           </div>
//           <div>
//             <FeatureSectionCard2
//               image={featureCard2_3}
//               title="Secure Online Payment"
//               subtitle="Pay instantly through Razorpay and get your booking confirmed in seconds."
//             />
//           </div>
//         </div>
//       </div>
//       <div
//         style={{
//           backgroundColor: "#22010A",
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "2rem",
//           height: "100vh",
//           gap: "40px",
//         }}
//       >
//         <div
//           style={{
//             width: "50%",
//             height: "100%",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <img
//             src={featureCard3_1}
//             alt="booking"
//             style={{
//               width: "100%",
//               height: "auto",
//               maxWidth: "600px",
//               aspectRatio: "1 / 1",
//               borderRadius: "24px",
//               objectFit: "cover",
//             }}
//           />
//         </div>

//         <div
//           style={{
//             width: "50%",
//             color: "white",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             gap: "1.5rem",
//             padding: "2rem",
//           }}
//         >
//           <p style={{ fontSize: "16px", fontWeight: "500", color: "#ddd" }}>
//             Discover
//           </p>
//           <h1 style={{ fontSize: "2.8rem", lineHeight: "1.2" }}>
//             Experience Hassle-Free <br /> Travel and Accommodation
//           </h1>
//           <p style={{ color: "#ccc", fontSize: "16px", maxWidth: "500px" }}>
//             Our platform simplifies hotel booking for guests and empowers
//             property owners to reach a wider audience. Enjoy a seamless
//             experience with trust signals like verified reviews and badges.
//           </p>

//           <div style={{ display: "flex", gap: "60px" }}>
//             <div>
//               <h3 style={{ fontSize: "1.5rem" }}>Easy</h3>
//               <p style={{ color: "#bbb", fontSize: "14px" }}>
//                 Book your stay in just a few clicks!
//               </p>
//             </div>
//             <div>
//               <h3 style={{ fontSize: "1.5rem" }}>Reliable</h3>
//               <p style={{ color: "#bbb", fontSize: "14px" }}>
//                 Join a community of satisfied travelers and hosts.
//               </p>
//             </div>
//           </div>

//           <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
//             <button
//               style={{
//                 padding: "0.6rem 1.2rem",
//                 background: "transparent",
//                 border: "1px solid white",
//                 color: "white",
//                 borderRadius: "8px",
//                 cursor: "pointer",
//               }}
//             >
//               Join
//             </button>
//             <button
//               style={{
//                 padding: "0.6rem 1.2rem",
//                 background: "#fff",
//                 color: "#22010A",
//                 border: "none",
//                 borderRadius: "8px",
//                 cursor: "pointer",
//               }}
//             >
//               Learn More &rarr;
//             </button>
//           </div>
//         </div>
//       </div>
//       <div
//         style={{
//           backgroundColor: "#0A0000", // or "#22010A" if you want consistency
//           color: "white",
//           textAlign: "center",
//           padding: "5rem 2rem",
//         }}
//       >
//         <h1
//           style={{
//             fontSize: "3rem",
//             fontWeight: "600",
//             marginBottom: "0.5rem",
//           }}
//         >
//           Book Your Stay
//           <br />
//           Join Our Team
//         </h1>

//         {/* Subtext */}
//         <p
//           style={{
//             fontSize: "1rem",
//             color: "#ddd",
//             margin: "1.5rem 0 2.5rem",
//             maxWidth: "700px",
//             marginLeft: "auto",
//             marginRight: "auto",
//           }}
//         >
//           Discover amazing places to stay and unlock exclusive benefits by
//           partnering with us today!
//         </p>

//         <div
//           style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}
//         >
//           <button
//             style={{
//               padding: "0.8rem 1.6rem",
//               backgroundColor: "#fff",
//               color: "#000",
//               border: "none",
//               borderRadius: "8px",
//               fontSize: "1rem",
//               fontWeight: "500",
//               cursor: "pointer",
//             }}
//           >
//             Book Now
//           </button>
//           <button
//             style={{
//               padding: "0.8rem 1.6rem",
//               backgroundColor: "transparent",
//               color: "#fff",
//               border: "2px solid #fff",
//               borderRadius: "8px",
//               fontSize: "1rem",
//               fontWeight: "500",
//               cursor: "pointer",
//             }}
//           >
//             Sign Up
//           </button>
//         </div>
//       </div>

//       <div
//         style={{
//           backgroundColor: "#151410", // Or #22010A for brand consistency
//           color: "white",
//           display: "flex",
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "4rem 8rem",
//           gap: "2rem",
//           flexWrap: "wrap",
//         }}
//       >
//         {/* Text Section */}
//         <div style={{ flex: 1, minWidth: "300px", maxWidth: "600px" }}>
//           <p style={{ fontSize: "16px", color: "#ccc" }}>Stay</p>
//           <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
//             Affordable Comfort for <br /> Every Traveler
//           </h1>
//           <p style={{ fontSize: "16px", color: "#bbb", marginBottom: "2rem" }}>
//             At our hotel booking platform, we believe that quality accommodation
//             should be accessible to everyone. Our mission is to connect
//             travelers with budget-friendly options that don't compromise on
//             comfort.
//           </p>

//           {/* Buttons */}
//           <div style={{ display: "flex", gap: "1rem" }}>
//             <button
//               style={{
//                 padding: "0.7rem 1.5rem",
//                 border: "2px solid white",
//                 borderRadius: "8px",
//                 background: "transparent",
//                 color: "white",
//                 cursor: "pointer",
//                 fontSize: "1rem",
//               }}
//             >
//               Learn More
//             </button>
//             <button
//               style={{
//                 padding: "0.7rem 1.5rem",
//                 border: "none",
//                 background: "transparent",
//                 color: "white",
//                 fontSize: "1rem",
//                 textDecoration: "underline",
//                 cursor: "pointer",
//               }}
//             >
//               Join Us &rarr;
//             </button>
//           </div>
//         </div>

//         {/* Image Section */}
//         <div
//           style={{
//             flex: 1,
//             maxWidth: "500px",
//             aspectRatio: "1 / 1",
//             overflow: "hidden",
//             borderRadius: "24px",
//           }}
//         >
//           <img
//             src={featureCard4_1}
//             alt="Comfortable Stay"
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               borderRadius: "24px",
//             }}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

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
            <button className="btn-outline-white">Join</button>
            <button className="btn-filled-white">Learn More &rarr;</button>
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
          <button className="filled">Book Now</button>
          <button className="outline">Sign Up</button>
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
