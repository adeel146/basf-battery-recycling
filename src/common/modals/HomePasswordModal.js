import React, { useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import { Form, Formik } from "formik";
import PropTypes from "prop-types";

import { verifyUserAccount } from "../services/AssignmentServices";
import "./modals.scss";
import TextField from "../ui/TextField";

const FeedbackMessage = (props) => {
  const [input, setinput] = useState();
  const [loading, setloading] = useState(false);
  const [passwordErr, setpasswordErr] = useState(false);
  const { show, close, setDeleteProductModal, setCheckChangesTrue, modalData } =
    props;
  const handleModal = () => {
    setDeleteProductModal(false);
    close();
  };
  const password = "Qwerty@123";
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
  const handleSubmit = (formik) => {
    if (formik.values.password === password) {
      setpasswordErr(false);
      close();
    } else {
      setpasswordErr(true);
    }
  };
  return (
    <Modal
      contentClassName="custom-modal"
      backdropClassName="custom-backdrop"
      show={show}
      centered
      size="lg"
      style={{backgroundColor:'rgba(0,0,0,0.8)'}}
    >
      {/* <div className="close-icon-div d-flex justify-content-end">
        <img
          src="/assets/icons/cross-icon.png"
          alt="cross-btn"
          onClick={close}
          className="custom-cursor"
        />
      </div> */}
      <div className="working-hours-modal  custom-height custom-modal-body bg-white p-5 ">
        <Formik
          initialValues={{
            password: "",
          }}
          // validationSchema={validate}
          // onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form style={{margin:'5% 30%'}}>
              <h1 className="my-5" style={{width:'20rem'}}>Enter Password</h1>
              <TextField
                type="password"
                name="password"
                label="Passwort"
                width="auto"
                padding="0.7rem 0.5rem"
                marginTop="1.3rem"
                textAlign="start"
              />
              {passwordErr && (
                <div className="custom-error">Incorrect Password</div>
              )}
              <button
                type="submit"
                className="btn"
                onClick={() => handleSubmit(formik)}
              >
                Enter
              </button>
            </Form>
          )}
        </Formik>
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
