import React from "react";
import { Row, Col, Modal } from "react-bootstrap";
import "./modals.scss";
import PropTypes from "prop-types";

const OpeningHoursTwo = (props) => {
  const { show, close, data, showBuno } = props;
  const getFacility = (key1) => {
    if (key1 === "1") {
      return "Keine";
    } else if (key1 === "2") {
      return "Gabelstapler";
    } else if (key1 === "3") {
      return "Laderampe";
    } else if (key1 === "4") {
      return "Gabelstapler & Laderampe";
    }
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
      <div className="working-hours-modal custom-modal-body bg-white p-5">
        <h4>Abholzeiten</h4>
        <div className="d-flex mb-4 mt-3">
          <p className="mb-0">
            <b>Von: </b>
            {data?.startOpeningHours}
          </p>
          <p className="mb-0 ms-5">
            <b>Bis: </b>
            {data?.endOpeningHours}
          </p>
        </div>
        <Row className="mb-3">
          <p className="mb-0">
            <b>{"Firmen Name:"}</b> {data?.name}
          </p>
        </Row>
        <Row className="mt-2">
          <Col lg={3}>
            {[
              { name: "Straße:", desc: data?.address },
              { name: "Postleitzahl:", desc: data?.postalCode },
              { name: "Stadt:", desc: data?.city },
            ].map((item, index) => (
              <p className="mb-0" key={index}>
                <b>{item.name}</b>{" "}
                {item.name === "Straße:" || item.name === "Stadt:"
                  ? item.desc?.slice(0, 15)
                  : item.desc}
              </p>
            ))}
          </Col>
          <Col lg={1} />
          <Col lg={8}>
            {[
              { name: "E-Mail der Kontaktperson:", desc: data?.email },
              { name: "Telefon der Kontaktperson:", desc: data?.phone },
              { name: showBuno && "BUNO:", desc: showBuno && data?.buno },
              {
                name:
                  data?.alternativePhone &&
                  "Telefon alternative Kontaktperson:",
                desc: data?.alternativePhone,
              },
            ].map((item, index) => (
              <p className="m-0" key={index}>
                <b>{item.name}</b>{" "}
                {item.name === "Telefon alternative Kontaktperson:" ||
                item.name === "Telefon der Kontaktperson:"
                  ? item.desc?.slice(0, 35)
                  : item.desc}
              </p>
            ))}
          </Col>
        </Row>
        <Row className="mb-5">
          <Col lg={12}>
            <p className="mb-0">
              <b>Be- und Entladeeinrichtungen: &nbsp;</b>
              {getFacility(data?.loadingFacility)}
            </p>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};
OpeningHoursTwo.propTypes = {
  show: PropTypes.any,
  close: PropTypes.any,
  data: PropTypes.any,
};
export default OpeningHoursTwo;
