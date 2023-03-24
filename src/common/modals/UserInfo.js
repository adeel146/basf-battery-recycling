import React from "react";
import { Row, Col, Modal } from "react-bootstrap";
import "./modals.scss";
import PropTypes from "prop-types";

const UserInfo = (props) => {
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
  const { show, close, modalData } = props;
  console.log(modalData, "modalData");
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
      <div className="working-hours-modal  custom-modal-body bg-white p-5 ">
        {!modalData?.emailVeryfy && <h5>Nutzer Freigeben?</h5>}
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
          <Col lg={5}>
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
                <b>{item.name}</b> {item.desc}
              </p>
            ))}
          </Col>
          <Col lg={7}>
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
      </div>
    </Modal>
  );
};
UserInfo.propTypes = {
  show: PropTypes.any,
  close: PropTypes.any,
  data: PropTypes.any,
  modalData: PropTypes.any,
};
export default UserInfo;
