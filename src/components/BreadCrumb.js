import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";
BreadCrumb.propTypes = {
  breadcrumb: PropTypes.any,
};
function BreadCrumb(props) {
  return (
    <div>
      <Breadcrumb>
        {props.breadcrumb.map(
          ({ name, activate, link, setScreen, value }, index) => {
            return !activate ? (
              <Breadcrumb.Item
                onClick={() => setScreen && setScreen(value)}
                key={index}
                href="#"
              >
                {link ? <Link to={link}> {name} </Link> : name}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={index} active>
                {name}
              </Breadcrumb.Item>
            );
          }
        )}
      </Breadcrumb>
    </div>
  );
}

export default BreadCrumb;
