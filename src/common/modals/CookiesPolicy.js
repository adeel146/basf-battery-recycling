import React from "react";
import {Modal} from "react-bootstrap";
import PropTypes from "prop-types";

const CookiesPolicy = (props) => {
    const {show, close} = props;
    return (

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
              <div id="ot-sdk-cookie-policy"></div>
            </div>
        </Modal>
    );
};
CookiesPolicy.propTypes = {
    show:PropTypes.any,
    close:PropTypes.any,
  };
export default CookiesPolicy;
