import React from "react";
import "./components.scss";
import PropTypes from "prop-types";

const InfoCard = ({ icon, heading, detail }) => {
  return (
    <div className="info-card">
      <img
        className="centered-icon"
        src={`assets/icons/${icon}.png`}
        alt="icon"
      />

      <h1>{heading}</h1>
      <h5>{detail}</h5>
    </div>
  );
};
InfoCard.propTypes = {
  icon: PropTypes.any,
  heading: PropTypes.any,
  detail: PropTypes.any,
};
export default InfoCard;
