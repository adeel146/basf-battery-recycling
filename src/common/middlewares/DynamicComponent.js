import React from "react";
import { Route } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import ToggleButton from "../../components/ToggleButton";
import PropTypes from "prop-types";

const DynamicComponent = ({
  component: Component,
  path,
  show,
  handleClick,
  toggle,
}) => {
  return (
    <>
      <Sidebar toggle={toggle} />
      <ToggleButton show={show} handleClick={handleClick} />
      <div className="main-page w-100">
        {/* <div
          className="position-absolute d-flex justify-content-center align-items-center"
          style={{
            top: "18%",
            backgroundColor: getThemeContent().color,
            height: "50px",
            width: "35px",
            zIndex: 999,
          }}
        >
          <a href="mailto:batteryrecycling-cs@basf.com" className="text-white">
            <FontAwesomeIcon icon={faQuestion} size="2x" />
          </a>
        </div> */}
        <Route
          exact
          path={path}
          render={() => {
            return <Component />;
          }}
        />
      </div>
    </>
  );
};
DynamicComponent.propTypes = {
  component: PropTypes.any,
  path: PropTypes.any,
  show: PropTypes.any,
  handleClick: PropTypes.any,
  toggle: PropTypes.any,
};
export default DynamicComponent;
