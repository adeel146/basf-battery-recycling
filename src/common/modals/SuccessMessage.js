import React from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { getThemeContent } from "../utils/Utilities";
import PropTypes from "prop-types";

const SuccessMessage = (props) => {
  const { show, close, message, route, next } = props;
  return (
    <Modal
      show={show}
      contentClassName="custom-modal"
      backdropClassName="custom-backdrop"
      centered
      size="lg"
    >
      <div className="err-message-modal bg-white px-5 py-4">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faCheckCircle} size="3x" color="green" />
          <h3 className="ms-3">Das Produkt wurde in den Warenkorb gelegt.</h3>
        </div>
        <p className="my-4 mx-2">{message}</p>
        <button
          className="mt-4 float-end message-btn"
          style={{
            backgroundColor: getThemeContent().color,
          }}
          onClick={() => {
            if (route) {
              close();
              setTimeout(() => {
                window.location = next;
              }, 500);
            } else {
              close();
            }
          }}
        >
          Fortfahren
        </button>
      </div>
    </Modal>
  );
};
SuccessMessage.propTypes = {
  show: PropTypes.any,
  close: PropTypes.any,
  message: PropTypes.any,
  route: PropTypes.any,
  next: PropTypes.any,
};
export default SuccessMessage;
