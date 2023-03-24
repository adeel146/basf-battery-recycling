import React, { useEffect, useRef } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const ToggleButton = (props) => {
  const { show, handleClick } = props;

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && show) {
        handleClick && handleClick();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClick, show]);

  return (
    <div ref={ref} className="toggle-btn" onClick={handleClick}>
      <FontAwesomeIcon
        icon={show ? faChevronRight : faChevronLeft}
        style={{
          color: show ? "#fff" : "#000",
          transition: "0.5s ease-in-out",
        }}
      />
    </div>
  );
};
ToggleButton.propTypes = {
  show: PropTypes.any,
  handleClick: PropTypes.any,
};
export default ToggleButton;
