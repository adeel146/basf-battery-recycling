import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import { removeProductFromCart } from "../services/OrderServices";
import PropTypes from "prop-types";

const DeleteProduct = (props) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const { show, close, id, setCheckChangesTrue } = props;
  const handleSubmit = async () => {
    setButtonLoading(true);

    let result = await removeProductFromCart(id);

    if (result?.success) {
      setButtonLoading(false);
      setCheckChangesTrue();
      toast.success("Produkt erfolgreich gelöscht");
      close();
    } else {
      setButtonLoading(false);
      toast.error(result?.message);
    }
  };

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
        <div className="remove-product custom-modal-body d-flex flex-column align-items-center">
          <h4>Produkt wirklich löschen?</h4>
          <div className="d-flex">
            <button type="submit" onClick={close}>
              Abbrechen
            </button>
            {!buttonLoading ? (
              <button type="submit" onClick={handleSubmit}>
                Löschen
              </button>
            ) : (
              <button type="submit" className="btn-disabled">
                Löschen
              </button>
            )}
          </div>
        </div>
      </Modal>
      <Toaster />
    </div>
  );
};
DeleteProduct.propTypes = {
  show:PropTypes.any,
  close:PropTypes.any,
  id:PropTypes.any,
  setCheckChangesTrue:PropTypes.any,
};
export default DeleteProduct;
