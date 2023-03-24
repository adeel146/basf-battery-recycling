import React, { useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import PropTypes from "prop-types";

import { verifyUserAccount } from "../services/AssignmentServices";
import "./modals.scss";

const FeedbackMessage = (props) => {
  const [input, setinput] = useState();
  const [loading, setloading] = useState(false);
  const {
    show,
    close,
    setDeleteProductModal,
    setCheckChangesTrue,
    modalData,
  } = props;
  const handleModal = () => {
    setDeleteProductModal(false);
    close();
  };
  const handleUserVerification = async (id) => {
    const obj = {
      userId: modalData.userId,
      userCompanyName: modalData.userCompanyName,
      varify: false,
      notes: input,
    };
    setloading(true);
    const result = await verifyUserAccount(obj);
    handleModal();
    if (result?.success) {
      toast.success(result?.message);
      setCheckChangesTrue();
    } else {
      toast.error(result?.message);
    }
    setloading(false);
  };
  console.log(modalData, "modalData");
  return (
    <Modal
      contentClassName="custom-modal"
      backdropClassName="custom-backdrop"
      show={show}
      centered
      size="lg"
    >
      <div
        className="close-icon-div d-flex justify-content-end"
      >
        <img
          src="/assets/icons/cross-icon.png"
          alt="cross-btn"
          onClick={close}
          className="custom-cursor"
        />
      </div>
      <div className="working-hours-modal  custom-height custom-modal-body bg-white p-5 ">
        <h5>Nutzer ablehnen?</h5>
        <p>
          Bitte hinterlassen Sie dem Nutzer eine Nachricht, wieso er nicht für
          das Battery Recycling Portal zugelassen wurde.
        </p>
        <textarea
          value={input}
          onChange={(e) => setinput(e.target.value)}
          style={{ width: "90%", height: "200px", padding: "10px" }}
        />

        <Row className="mb-4">
          <Col lg={8} />
          <Col lg={4}>
            <p className="mt-5">
              {!loading ? (
                <button
                  onClick={() => handleUserVerification()}
                  className="btn-Ablehnen"
                  type="submit"
                >
                  Ablehnen
                </button>
              ) : (
                <button
                  disabled
                  className="btn-Ablehnen disabled-btn"
                  type="submit"
                >
                  Ablehnen
                </button>
              )}
            </p>
          </Col>
        </Row>
      </div>
      <Toaster />
    </Modal>
  );
};
FeedbackMessage.propTypes = {
  show: PropTypes.any,
  close: PropTypes.any,
  data: PropTypes.any,
  setDeleteProductModal: PropTypes.any,
  setCheckChangesTrue: PropTypes.any,
  modalData: PropTypes.any,
};
export default FeedbackMessage;
