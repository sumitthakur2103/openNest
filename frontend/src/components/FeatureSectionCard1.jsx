import React from "react";
import PropTypes from "prop-types";
import "../styles/FeatureSectionCard1.css";

export default function FeatureSectionCard1({
  icon,
  title,
  subtitle,
  onClick,
}) {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-icon">
        <img src={icon} alt="Card Icon" />
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-subtitle">{subtitle}</p>
    </div>
  );
}

FeatureSectionCard1.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  onClick: PropTypes.func,
};

FeatureSectionCard1.defaultProps = {
  subtitle: "",
  onClick: () => {},
};
