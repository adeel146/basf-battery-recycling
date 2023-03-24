import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import CheckBox from "../ui/CheckBox";
import PropTypes from "prop-types";

const OrderBatteryCollection = (props) => {
  const [confirm, setConfirm] = useState(false);

  const handleChange = (e, key) => {
    const value = e.target.checked;

    if (key === "confirm") {
      setConfirm(value);
    }
  };
  const { show, hideModal } = props;
  return (
    <div>
      <Modal
        show={show}
        centered
        size="lg"
        contentClassName="custom-modal"
        backdropClassName="custom-backdrop"
      >
        {/* <div className="close-icon-div d-flex justify-content-end">
          <img
            src="/assets/icons/cross-icon.png"
            alt="cross-btn"
            className="custom-cursor"
          />
        </div> */}
        <div className="order-collections custom-modal-body">
          <h4>
            <b>BESTELLUNG EINER ABHOLUNG FÜR BATTERIEN</b>
          </h4>
          <p className="my-4">
            In dieser Übersicht können nur Abholungen von Batterien beantragt
            werden, welche ordnungsgemäß verpackt und abholbereit zur Verfügung gestellt werden müssen.
          </p>
          <CheckBox
            label="Hiermit wird bestätigt, dass die komplette Abholung ordnungsgemäß und transportgerecht verpackt sowie korrekt gekennzeichnet ist."
            checked={confirm}
            onChange={(e) => handleChange(e, "confirm")}
            fontWeight="normal"
          />
          {confirm ? (
            <button
              className="mt-5"
              onClick={() => {
                if (confirm) {
                  hideModal();
                }
              }}
            >
              Bestätigen
            </button>
          ) : (
            <button className="mt-5 disabled-btn" disabled>
              Bestätigen
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
};
OrderBatteryCollection.propTypes = {
  show: PropTypes.any,
  hideModal: PropTypes.any,
};
export default OrderBatteryCollection;
