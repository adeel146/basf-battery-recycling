import React from "react";
import { Row, Col, Modal } from "react-bootstrap";
import "./modals.scss";
import PropTypes from "prop-types";

const ReplacementPackaging = (props) => {
  const { show, close, data } = props;

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
      <div className="replacement-packaging-modal custom-modal-body bg-white p-5">
        <h4>Ersatzverpackung bei Abholung</h4>
        <div className="d-flex mb-4 mt-3">
          <p className="mb-0 w-75">
            In dieser Übersicht wir die angefragt Ersatzverpackung bei Abholung
            für die jeweilige Auftragsnummer gelistet.
          </p>
        </div>
        <Row className="mb-5">
          <Col lg={2} className="mt-2">
            <b>Verpackung:</b>
            {data?.map((item, index) => (
              <p key={index}>{item?.packagingTypeName}</p>
            ))}
          </Col>
          <Col lg={3} className="mt-2">
            <b>Anzahl:</b>
            {data?.map((item, index) => (
              <p key={index}>{item?.count} Stk</p>
            ))}
          </Col>
        </Row>
      </div>
    </Modal>
  );
};
ReplacementPackaging.propTypes = {
  show: PropTypes.any,
  close: PropTypes.any,
  data: PropTypes.any,
};
export default ReplacementPackaging;
