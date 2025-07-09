import React from "react";
import "../styles/featureSectionCard2.css";

export default function FeatureSectionCard2({ image, title, subtitle }) {
  return (
    <div className="card-container">
      <img src={image} alt="Card Visual" className="card-image" />
      <h2 className="card-title">{title}</h2>
      <p className="card-subtitle">{subtitle}</p>
    </div>
  );
}
