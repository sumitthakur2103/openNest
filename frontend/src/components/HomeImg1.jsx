import React from "react";
import HotelImg from "../assets/Hotel1.jpg";

export default function HomeImg1() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "70px",
        backgroundColor: "black",
      }}
    >
      <img
        src={HotelImg}
        alt="Hotel"
        style={{ width: "100%", height: "100%", borderRadius: "20px" }}
      />
    </div>
  );
}
