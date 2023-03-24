import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { toast, Toaster } from "react-hot-toast";
import "./forgotPassword.scss";
import { forgetPassword } from "../../common/services/UserServices";
import TextField from "../../common/ui/TextField";

const ForgotPassword = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  useEffect(() => {
    window._paq.push(["setUserId", (localStorage.getItem("email"))?localStorage.getItem("email"):"anonymousUser"]);
    window._paq.push(["trackPageView"]);
  },[]);
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
        setButtonLoading(false);
        localStorage.setItem("forget-password", true);
      } else {
        toast.error(result.message);
        setButtonLoading(false);
      }
    }
  };
  return (
    <div className="forgot-password-page pt-5 d-flex flex-column justify-content-center align-items-center">
      <p className="mb-0 name">Please Enter your Registered email address.</p>
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
              <button type="submit" onClick={() => handleSubmit(formik)}>
                Send
              </button>
            ) : (
              <button type="submit" className="btn-disabled">
                Send
              </button>
            )}
          </Form>
        )}
      </Formik>
      <Toaster />
    </div>
  );
};

export default ForgotPassword;
