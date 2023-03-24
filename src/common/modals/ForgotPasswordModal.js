import React, { useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import { Form, Formik } from "formik";
import TextField from "../ui/TextField";
import { forgetPassword } from "../services/UserServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ForgotPasswordModal = ({ show, close }) => {
  const [buttonLoading, setButtonLoading] = useState(false);

  const validate = Yup.object({
    email: Yup.string()
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Muss eine gültige E-Mail-Adresse sein"
      )
      .required("Erforderlich"),
  });
  const handleSubmit = async (formik) => {
    if (formik.isValid && Object.keys(formik.touched).length > 0) {
      setButtonLoading(true);
      let result = await forgetPassword(formik.values);
      if (result?.success) {
        toast.success(result?.message);
        localStorage.setItem("forget-password", true);
        setTimeout(() => {
          close();
        }, 1000);
      } else {
        toast.error(result.message);
      }
      setButtonLoading(false);
    }
  };
  return (
    <div>
      <Modal
        show={show}
        centered
        size="lg"
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
        <div className=" remove-product custom-modal-body d-flex flex-column align-items-center">
          <h3 className="">Please Enter your Registered email address.</h3>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={validate}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form className="d-flex flex-column align-items-center justify-content-center">
                <TextField
                  type="email"
                  name="email"
                  label="E-mail"
                  width="400px"
                  marginTop="0"
                  padding="0.7rem 0.5rem"
                />
                {!buttonLoading ? (
                  <button
                    className="mt-4 btn"
                    type="submit"
                    onClick={() => handleSubmit(formik)}
                  >
                    Send
                  </button>
                ) : (
                  <button type="submit " className="btn-disabled btn mt-4">
                    Send
                  </button>
                )}
              </Form>
            )}
          </Formik>
          <Toaster />
        </div>
      </Modal>
    </div>
  );
};

ForgotPasswordModal.propTypes = {
  show: PropTypes.any,
  close: PropTypes.any,
};

export default ForgotPasswordModal;
