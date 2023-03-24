import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { toast, Toaster } from "react-hot-toast";
import { Link, useHistory } from "react-router-dom";
import "./login.scss";
import { getDashboardData } from "../../common/services/CommonServices";
import { loginUser } from "../../common/services/UserServices";
import TextField from "../../common/ui/TextField";
import Sidebar from "../../components/Sidebar";
import {trackingView} from "../../common/utils/PageDetails";
import {setCustomVariable} from "../../common/utils/Motomo";
const Login = (props) => {
  trackingView({"value":"/login"})
  const history = useHistory();
  const [buttonLoading, setButtonLoading] = useState(false);
  const validate = Yup.object({
    email: Yup.string()
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Muss eine gültige E-Mail-Adresse sein"
      )
      .required("Erforderlich"),
    password: Yup.string().required("Erforderlich"),
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      window.location = "/assignments";
    }
  }, []);

  const handleSubmit = async (formik) => {
    if (formik.isValid && Object.keys(formik.touched).length > 0) {
      setButtonLoading(true);

      let result = await loginUser(formik.values);
      if (result?.success) {
        let payload = result?.payLoad;
        setButtonLoading(false);

        toast.success(result?.message);
        if (result?.payLoad?.role?.name === "DealerAdmin") {
          localStorage.setItem("user", "BMW Niederlassung");
        } else if (
          result?.payLoad?.role?.name === "Transportation Comapany Admin"
        ) {
          localStorage.setItem("user", "Logistikkonzern");
        } else if (result?.payLoad?.role?.name === "WatcherComapanyAdmin") {
          localStorage.setItem("user", "BMW OEM");
        } else if (result?.payLoad?.role?.name === "ManagementComapanyAdmin") {
          localStorage.setItem("user", "BASF");
        }
        localStorage.setItem(
          "menuStructure",
          JSON.stringify(payload?.menuStructure)
        );
        localStorage.setItem("email", payload?.email);
        localStorage.setItem("userId", payload?.userId);
        localStorage.setItem("companyMail", payload?.email);
        localStorage.setItem("companyName", payload?.company?.name);
        localStorage.setItem("isFirstLogin", payload?.isFirstLogin);
        localStorage.setItem("role", payload?.role?.name);
        getDBListing(payload);
        setCustomVariable(1, 'role', payload?.role?.name, 'visit');
      } else {
        setButtonLoading(false);
        toast.error("Falsche E-Mail und Passwort bitte überprüfen!");
      }
    }
  };
  const getDBListing = async (payload) => {
    let dashboardData = await getDashboardData();
    if (dashboardData?.success) {
      localStorage.setItem(
        "dashboardData",
        JSON.stringify(dashboardData?.payLoad)
      );

      if (payload?.role?.name === "DealerAdmin" && payload?.isFirstLogin) {
        setTimeout(() => {
          history.push("/account-info-dealer");
        }, 1000);
      } else if (
        payload?.role?.name === "DealerAdmin" &&
        !payload?.isFirstLogin
      ) {
        setTimeout(() => {
          history.push("/select-service");
        }, 1000);
      } else if (
        payload?.role?.name === "Transportation Comapany Admin" &&
        payload?.isFirstLogin
      ) {
        setTimeout(() => {
          window.location = "/account-info-logistics";
        }, 1000);
      } else {
        setTimeout(() => {
          window.location = "/assignments";
        }, 1000);
      }
    } else {
      toast.error(dashboardData?.message);
    }
  };
  return (
    <>
      <Sidebar />
      <div className="login-container">
        <div className="login-page mx-3 d-flex flex-column justify-content-center">
          <img src="/assets/icons/logo.svg" alt="brand" width="180px" />
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validate}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <h1 className="my-5">Optimiertes Batterie-Recycling</h1>
                <TextField
                  type="email"
                  name="email"
                  label="E-mail"
                  width="400px"
                  padding="0.7rem 0.5rem"
                />
                <TextField
                  type="password"
                  name="password"
                  label="Passwort"
                  width="400px"
                  padding="0.7rem 0.5rem"
                  marginTop="1.3rem"
                />
                <div className="login-actions mt-4 d-flex justify-content-between align-items-center">
                  <Link to="/forgot-password">Passwort vergessen?</Link>
                  {!buttonLoading ? (
                    <button
                      type="submit"
                      className="custom-btn"
                      onClick={() => handleSubmit(formik)}
                    >
                      <img src="/assets/icons/login-arrow.png" alt="arrow" />
                    </button>
                  ) : (
                    <button type="submit" className="custom-btn btn-disabled">
                      <img src="/assets/icons/login-arrow.png" alt="arrow" />
                    </button>
                  )}
                </div>
                <div className="create-account">
                  <p>Sie haben noch keinen Account? </p>
                  <Link className="create-account-link" to="/create-account">
                    Jetzt Account erstellen.
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default Login;
