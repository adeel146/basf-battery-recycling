import React from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const ErrorMessage = (props) => {
  
  const { show, close, message } = props;
  return (
    <Modal
      show={show}
      contentClassName="custom-modal"
      backdropClassName="custom-backdrop"
      centered
      size="md"
    >
      <div className="err-message-modal bg-white px-5 py-4">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faTimesCircle} size="3x" color="red" />
          <h3 className="ms-3">Error Message</h3>
        </div>
        <p className="my-4 mx-2">{message}</p>
        <button
          className="mt-4 float-end message-btn"
          onClick={() => {
            close();
          }}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};
ErrorMessage.propTypes = {
  show: PropTypes.any,
  close: PropTypes.any,
  message: PropTypes.any,
};
export default ErrorMessage;
