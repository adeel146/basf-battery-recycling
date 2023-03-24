import React, { useState } from "react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { changePassword } from "../../common/services/UserServices";
import TextField from "../../common/ui/TextField";
import PropTypes from "prop-types";

const ChangePassword = (props) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const history = useHistory();
  const validate = Yup.object({
    currentPassword: Yup.string().required("Erforderlich"),
    newPassword: Yup.string()
      .required("Erforderlich")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Muss mindestens 8 Zeichen enthalten, einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und einen Sonderbuchstaben"
      ),
    retypeNewPassword: Yup.string()
      .required("Erforderlich")
      .oneOf([Yup.ref("newPassword"), null],"Passwort muss übereinstimmen")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Muss mindestens 8 Zeichen enthalten, einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und einen Sonderbuchstaben"
      ),
  });

  const handleSubmit = async (formik) => {
    if (formik.isValid && Object.keys(formik.touched).length > 0) {
      setButtonLoading(true);
      let result = await changePassword({
        userId: localStorage.getItem("userId"),
        oldPassword: formik?.values?.currentPassword,
        newPassword: formik?.values?.newPassword,
      });
      if (result?.success) {
        localStorage.clear();
        toast.success(result?.message);
        setTimeout(() => {
          history.push("/");
        }, 1000);
        setButtonLoading(false);
      } else {
        toast.error(result?.message);
        setButtonLoading(false);
      }
    }
  };

  const { reset } = props;
  return (
    <div className="change-settings-card pb-5">
      <div className="heading d-flex flex-column">
        <div className="d-flex align-items-center mb-5">
          <FontAwesomeIcon icon={faChevronLeft} onClick={reset} size="2x" />
          <h1 className="mb-0 ms-3">
            Passwort ändern
          </h1>
        </div>

        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            retypeNewPassword: "",
          }}
          validationSchema={validate}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <Row>
                <Col lg={4}>
                  <TextField
                    type="password"
                    name="currentPassword"
                    label="Aktuelles Passwort"
                    padding="1rem 0.5rem"
                  />
                  <TextField
                    type="password"
                    name="newPassword"
                    label="Neues Passwort"
                    padding="1rem 0.5rem"
                    marginTop="1.3rem"
                    minLength={8}
                    maxLength={13}
                  />
                  <TextField
                    type="password"
                    name="retypeNewPassword"
                    label="Neues Passwort wiederholen"
                    padding="1rem 0.5rem"
                    marginTop="1.3rem"
                    minLength={8}
                    maxLength={13}
                  />
                </Col>
              </Row>
              {!buttonLoading ? (
                <button
                  type="submit"
                  className="mt-5"
                  onClick={() => handleSubmit(formik)}
                >
                  Change Password
                </button>
              ) : (
                <button type="submit" className="mt-5 btn-disabled">
                  Change Password
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>
      <Toaster />
    </div>
  );
};
ChangePassword.propTypes = {
  reset: PropTypes.any,
};
export default ChangePassword;
