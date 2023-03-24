import React, { useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import "./modals.scss";
import { toast, Toaster } from "react-hot-toast";
import { verifyUserAccount } from "../services/AssignmentServices";
import PropTypes from "prop-types";

const DeleteUserRequest = (props) => {
  const [loading, setloading] = useState(false);

  const {
    show,
    close,
    data,
    setDeleteProductModal,
    modalData,
    setCheckChangesTrue,
    handleSecond,
  } = props;
  const getFacility = (key) => {
    // if (key1 && key2) {
    //   return "Gabelstapler & Laderampe";
    // } else if (key1 && !key2) {
    //   return "Gabelstapler";
    // } else if (!key1 && key2) {
    //   return "Laderampe";
    // } else if (!key1 && !key2) {
    //   return "No";
    // }
    if (key == "1") {
      return "Keine";
    } else if (key == "2") {
      return "Gabelstapler";
    } else if (key == "3") {
      return "Laderampe";
    } else if (key == "4") {
      return "Gabelstapler & Laderampe";
    }
  };
  const handleUserVerification = async (props) => {
    const obj = {
      userId: props.userId,
      varify: true,
      notes: "",
      UserCompanyName: props.UserCompanyName ? props.UserCompanyName : "",
    };
    setloading(true);
    const result = await verifyUserAccount(obj);
    setDeleteProductModal(false);

    if (result?.success) {
      toast.success(result?.message);
      setCheckChangesTrue();
    } else {
      toast.error(result?.message);
    }
    setloading(false);
  };
  const handleCommentModal = () => {
    handleSecond();
  };
  return (
    <Modal
      contentClassName="custom-modal"
      backdropClassName="custom-backdrop"
      show={show}
      centered
      size="lg"
    >
      <div className="close-icon-div d-flex justify-content-end">
        <img
          src="/assets/icons/cross-icon.png"
          alt="cross-btn"
          onClick={close}
          className="custom-cursor"
        />
      </div>
      <div className="working-hours-modal custom-modal-body bg-white p-5 ">
        <h5>Nutzer Freigeben?</h5>
        <h6 style={{ marginTop: "17px", marginBottom: "3px" }}>Abholzeiten:</h6>
        <div className="d-flex mb-4">
          <p className="mb-0">
            <b>Von : </b>
            {modalData?.pickupStart}
          </p>
          <p className="mb-0 ms-5">
            <b>Bis : </b>
            {modalData?.pickupEnd}
          </p>
        </div>
        <Row className="mb-3">
          <p className="mb-0">
            <b>{"Firmen Name:"}</b> {modalData?.userCompanyName}
          </p>
        </Row>
        <Row className="mt-2">
          <Col lg={3}>
            {[
              { name: "Straße:", desc: modalData?.address },
              { name: "Postleitzahl:", desc: modalData?.postalCode },
              { name: "Stadt:", desc: modalData?.city },
              {
                name: "Abfallerzeugernummer:",
                desc: modalData?.wasteGeneratorNumber,
              },
            ].map((item, index) => (
              <p className="mb-0" key={index}>
                <b>{item.name}</b>{" "}
                {item.name === "Straße:" || item.name === "Stadt:"
                  ? item.desc?.slice(0, 15)
                  : item.desc}
              </p>
            ))}
          </Col>
          <Col lg={2} />
          <Col lg={6}>
            {[
              { name: "E-Mail der Kontaktperson:", desc: modalData?.email },
              {
                name: "Telefon der Kontaktperson:",
                desc: modalData?.contactPhone,
              },
              {
                name: "Be- und Entladeeinrichtungen:",
                desc: getFacility(modalData?.loadingFacility),
              },
              {
                name: "EU Steuernummer:",
                desc: modalData?.euTaxNumber,
              },
              {
                name: "BUNO:",
                desc: modalData?.buno,
              },
            ].map((item, index) => (
              <p className="m-0" key={index}>
                <b>{item.name}</b> {item.desc}
              </p>
            ))}
          </Col>
        </Row>
        <Row className="mb-4">
          <Col lg={2}>
            <p className="mt-5">
              <button
                onClick={handleCommentModal}
                className="btn-Ablehnen  disabled-btn"
                type="submit"
              >
                Ablehnen
              </button>
            </p>
          </Col>
          <Col lg={4} />
          <Col lg={6}>
            <p className="mt-5">
              {!loading ? (
                <button
                  onClick={() => handleUserVerification(modalData)}
                  className="btn-Ablehnen"
                  type="submit"
                >
                  Freigeben
                </button>
              ) : (
                <button
                  disabled
                  className="btn-Ablehnen disabled-btn"
                  type="submit"
                >
                  Freigeben
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
DeleteUserRequest.propTypes = {
  show: PropTypes.any,
  close: PropTypes.any,
  data: PropTypes.any,
  setDeleteProductModal: PropTypes.any,
  modalData: PropTypes.any,
  setCheckChangesTrue: PropTypes.any,
  handleSecond: PropTypes.any,
  UserCompanyName: PropTypes.any,
  userId: PropTypes.any,
};
export default DeleteUserRequest;
