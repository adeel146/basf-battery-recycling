import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";
import Dropdown from "../ui/DropDown";
import { updateTransportationCompany } from "../services/AssignmentServices";
import PropTypes from "prop-types";
import { AssignPackagingOrder } from "../services/OrderServices";

const AssignLogisticsCompany = (props) => {
  const { show, close, list, id, setCheckChangesTrue, filterTableValue } =
    props;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [company, setCompany] = useState("");

  const handleChange = (e) => {
    let value = e.target.value;
    setCompany(value);
  };
  const handleSubmit = async () => {
    if (company) {
      setButtonLoading(true);
      if (filterTableValue === "Abholungen") {
        let result = await updateTransportationCompany({
          transportId: company,
          orderId: id,
        });
        if (result?.success) {
          setCheckChangesTrue();
          toast.success("Auftrag vergeben");
          close();
        } else {
          toast.error(result?.message);
        }
      } else if (filterTableValue === "Verpackungsmaterial") {
        let result = await AssignPackagingOrder({
          transportId: company,
          orderId: id,
        });
        if (result?.success) {
          setCheckChangesTrue();
          toast.success("Auftrag vergeben");
          close();
        } else {
          toast.error(result?.message);
        }
      }
      setButtonLoading(false);
    }
  };

  console.log(list, "list");
  return (
    <div>
      <Modal
        show={show}
        centered
        size="md"
        contentClassName="custom-modal"
        backdropClassName="custom-backdrop"
      >
        <div className="close-icon-div d-flex justify-content-end">
          <img
            src="/assets/icons/cross-icon.png"
            alt="cross-btn"
            onClick={close}
            className="custom-cursor"
          />
        </div>
        <div className="assign-company custom-modal-body d-flex flex-column">
          <h4 className="mb-4 ms-3">Logistikunternehmen zuordnen</h4>

          <div className="d-flex align-items-center justify-content-around w-100 mob-field-outer">
            <div className="mob-field">
              <Dropdown
                width="230px"
                list={list?.payLoad}
                onChange={handleChange}
                value={company}
              />
            </div>
            <div>
              {!buttonLoading && company ? (
                <button type="submit" className="me-0" onClick={handleSubmit}>
                  Freigeben und zuordnen
                </button>
              ) : (
                <button type="submit" className="btn-disabled me-0">
                  Freigeben und zuordnen
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal>
      <Toaster />
    </div>
  );
};
AssignLogisticsCompany.propTypes = {
  show: PropTypes.any,
  close: PropTypes.any,
  list: PropTypes.any,
  id: PropTypes.any,
  setCheckChangesTrue: PropTypes.any,
  filterTableValue: PropTypes.string,
};
export default AssignLogisticsCompany;
