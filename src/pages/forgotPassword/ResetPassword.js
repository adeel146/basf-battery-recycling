import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { toast, Toaster } from "react-hot-toast";
import "./forgotPassword.scss";
import { resetPassword } from "../../common/services/UserServices";
import TextField from "../../common/ui/TextField";
import Footer from "../../components/Footer";

const ResetPassword = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const validate = Yup.object({
    password: Yup.string()
      .required("Erforderlich")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Muss mindestens 8 Zeichen enthalten, einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und einen Sonderbuchstaben"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwort muss übereinstimmen")
      .required("Erforderlich")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Muss mindestens 8 Zeichen enthalten, einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und einen Sonderbuchstaben"
      ),
  });
  const handleSubmit = async (formik) => {
    if (formik.isValid && Object.keys(formik.touched).length > 0) {
      setButtonLoading(true);
      let result = await resetPassword({
        forgetPasswordId: localStorage.getItem("forgetPasswordId"),
        newPassword: formik?.values?.password,
      });
      if (result?.success) {
        setButtonLoading(false);
        localStorage.clear();
        setTimeout(() => {
          window.location = "/login";
        }, 2500);
      } else {
        setButtonLoading(false);
        toast.error(result?.message);
      }
    }
  };
  return (
    <>
      <div
        style={{ "padding-bottom": "32rem" }}
        className="forgot-password-page height-page pt-5 d-flex flex-column login-container"
      >
        <h3 className="mb-5 name">
          <b>Passwort erstellen</b>
        </h3>
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validate}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form
              style={{ width: "400px" }}
              className="d-flex flex-column   justify-content-center"
            >
              <TextField
                type="password"
                name="password"
                label="Passwort*"
                width="400px"
                marginTop="0"
                padding="0.7rem 0.5rem"
                cardWidth="400px"
                minLength={8}
                maxLength={13}
              />
              <TextField
                type="password"
                name="confirmPassword"
                label="Passwort wiederholen*"
                width="400px"
                marginTop="0"
                padding="0.7rem 0.5rem"
                cardWidth="400px"
                minLength={8}
                maxLength={13}
              />
              <div style={{ width: "400px" }}>
                <button
                  style={{ float: "right" }}
                  className={`${
                    buttonLoading === true ? "btn-disabled" : ""
                  } justify-content-center `}
                  type="submit"
                  onClick={() => {
                    handleSubmit(formik);
                  }}
                >
                  Passwort erstellen
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p style={{ width: "400px", fontSize: "10px", marginTop: "2%" }}>
          * Das Passwort muss zwischen 8 und 35 Zeichen lang sein und sowohl
          Groß- als auch Kleinbuchstaben, mindestens eine Zahl und mindestens
          ein Sonderzeichen (#$@!%&*?) enthalten.
        </p>
        <Toaster />
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
