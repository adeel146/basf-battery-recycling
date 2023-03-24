import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import "./login.scss";
import {
  editAccountInfo,
  getUserProfile,
} from "../../common/services/UserServices";
import CheckBox from "../../common/ui/CheckBox";
import TextField from "../../common/ui/TextField";
import { inputLimits } from "../../common/constants/constants";
import {trackingView} from "../../common/utils/PageDetails";

const AccountInformationDealer = () => {
  trackingView({"value":"/settings"});
  const [initialValues, setInitialValues] = useState({});
  const [forklift, setForklift] = useState(false);
  const [loadingDock, setLoadingDock] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [facilitiesError, setFacilitiesError] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");

  const history = useHistory();
  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("isFirstLogin") !== "true"
    ) {
      history.push("/assignments");
    } else {
      const getProfile = async () => {
        let result = await getUserProfile();
        if (result?.success) {
          result = result?.payLoad;
          setInitialValues(result);
          setForklift(result?.payLoad?.forklift);
          setLoadingDock(result?.payLoad?.isLoadingdock);
        } else {
        }
      };
      getProfile();
    }
  }, [history]);
  const validate = Yup.object({
    name: Yup.string().required("Erforderlich"),
    phone: Yup.string().required("Erforderlich"),
    address: Yup.string().required("Erforderlich"),
    city: Yup.string().required("Erforderlich"),
    postalCode: Yup.number()
      .required("Erforderlich")
      .min(1, "Must be greater than 0"),
    wasteGeneratorNumber: Yup.string().required("Erforderlich"),
    euTaxNumber: Yup.string().required("Erforderlich"),
    startOpeningHours: Yup.string().required("Erforderlich"),
    endOpeningHours: Yup.string().required("Erforderlich"),
  });

  const handleSubmit = async (formik) => {
    if (
      formik.isValid &&
      Object.keys(formik.touched).length > 0 &&
      postalCodeError === ""
    ) {
      setButtonLoading(false);
      let obj = {
        Type: "dealercompany",
        Name: formik.values.name,
        payLoad: {
          email: localStorage.getItem("companyMail"),
          dealerCompanyId: initialValues?.payLoad?.dealerCompanyId,
          forklift: forklift,
          isLoadingdock: loadingDock,
          phone: formik.values.phone,
          address: formik.values.address,
          city: formik.values.city,
          postalCode: formik.values.postalCode,
          wasteGeneratorNumber: formik.values.wasteGeneratorNumber,
          euTaxNumber: formik.values.euTaxNumber,
          startOpeningHours: formik.values.startOpeningHours,
          endOpeningHours: formik.values.endOpeningHours,
        },
      };

      let result = await editAccountInfo(obj);
      if (result?.success) {
        setButtonLoading(true);
        toast.success(result?.message);
        setTimeout(() => {
          history.push("/select-service");
        }, 2500);
      } else {
        setButtonLoading(true);
        toast.error(result?.message);
      }
    }
  };
  const handleChange = (e, key) => {
    const value = e.target.checked;
    if (key === "Forklift") {
      setFacilitiesError("");
      setForklift(value);
    } else if (key === "Loading Dock") {
      setFacilitiesError("");
      setLoadingDock(value);
    } else if (key === "termsAndConditions") {
      setTermsAndConditions(value);
      if (termsAndConditions) {
        setButtonLoading(false);
      } else {
        setButtonLoading(true);
      }
    }
  };
  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "postalCode" && value.length > inputLimits.five) {
      setPostalCodeError(`Length must be ${inputLimits.five} digit.`);
    } else {
      setPostalCodeError("");
    }
  };

  return (
    <div className="account-info-container">
      <div className="account-info-page mx-3 d-flex flex-column justify-content-center">
        <Formik
          initialValues={{
            name:
              localStorage.getItem("companyName")?.length > 0
                ? localStorage.getItem("companyName")
                : "",
            phone: initialValues?.payLoad?.phone
              ? initialValues?.payLoad?.phone
              : "",
            address: initialValues?.payLoad?.address
              ? initialValues?.payLoad?.address
              : "",
            city: initialValues?.payLoad?.city
              ? initialValues?.payLoad?.city
              : "",
            postalCode: initialValues?.payLoad?.postalCode
              ? initialValues?.payLoad?.postalCode
              : 0,
            wasteGeneratorNumber: initialValues?.payLoad?.wasteGeneratorNumber
              ? initialValues?.payLoad?.wasteGeneratorNumber
              : "",
            euTaxNumber: initialValues?.payLoad?.euTaxNumber
              ? initialValues?.payLoad?.euTaxNumber
              : "",
            startOpeningHours: initialValues?.payLoad?.startOpeningHours
              ? initialValues?.payLoad?.startOpeningHours
              : "",
            endOpeningHours: initialValues?.payLoad?.endOpeningHours
              ? initialValues?.payLoad?.endOpeningHours
              : "",
          }}
          validationSchema={validate}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => (
            <Form onChange={handleOnChange}>
              <h1 className="my-4">Account Informationen</h1>
              <Row className="account__section">
                <Col lg={4}>
                  <TextField
                    type="text"
                    name="name"
                    label="Firmenname*"
                    padding="1rem 0.5rem"
                    maxLength={inputLimits.fifty}
                  />
                  <TextField
                    type="email"
                    name="contactPersonEmail"
                    label="E-Mail der Kontaktperson*"
                    padding="1rem 0.5rem"
                    marginTop="1.3rem"
                    value={localStorage.getItem("companyMail")}
                    disabled
                  />
                  <TextField
                    type="text"
                    name="phone"
                    label="Telefon der Kontaktperson*"
                    padding="1rem 0.5rem"
                    marginTop="1.3rem"
                    maxLength={inputLimits.fifty}
                  />
                </Col>
                <Col lg={4}>
                  <TextField
                    type="text"
                    name="address"
                    label="Adresse*"
                    padding="1rem 0.5rem"
                    maxLength={inputLimits.fifty}
                  />
                  <TextField
                    type="text"
                    name="city"
                    label="Stadt*"
                    padding="1rem 0.5rem"
                    marginTop="1.3rem"
                    maxLength={inputLimits.fifty}
                  />
                  <TextField
                    type="number"
                    name="postalCode"
                    label="Postleitzahl*"
                    padding="1rem 0.5rem"
                    marginTop="1.3rem"
                    maxLength={inputLimits.five}
                  />
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    {postalCodeError}
                  </p>
                </Col>
                <Col lg={4}>
                  <TextField
                    type="text"
                    name="wasteGeneratorNumber"
                    label="Abfallerzeugernummer*"
                    padding="1rem 0.5rem"
                    maxLength={inputLimits.fifty}
                  />
                  <TextField
                    type="text"
                    name="euTaxNumber"
                    label="EU Steuernummer*"
                    padding="1rem 0.5rem"
                    marginTop="1.3rem"
                    maxLength={inputLimits.fifty}
                  />
                  <Row>
                    <Col lg={6}>
                      <TextField
                        type="time"
                        name="startOpeningHours"
                        label="Abholszeiten*"
                        padding="1rem 0.5rem"
                        marginTop="1.3rem"
                      />
                    </Col>
                    <Col lg={6}>
                      <TextField
                        type="time"
                        name="endOpeningHours"
                        padding="1rem 0.5rem"
                        marginTop="1.3rem"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <h6>Be- und Entladeeinrichtungen*</h6>
              <div className="d-flex">
                <CheckBox
                  label="Gabelstapler"
                  checked={forklift}
                  onChange={(e) => handleChange(e, "Forklift")}
                />
                <CheckBox
                  label="Laderampe"
                  checked={loadingDock}
                  onChange={(e) => handleChange(e, "Loading Dock")}
                  marginLeft="3rem"
                />
              </div>
              <p className="mb-0 custom-error">{facilitiesError}</p>
              <div className="d-flex justify-content-end">
                <div className="d-flex flex-column">
                  <CheckBox
                    label="AGBs akzeptieren"
                    checked={termsAndConditions}
                    onChange={(e) => handleChange(e, "termsAndConditions")}
                  />
                  {buttonLoading ? (
                    <button
                      type="submit"
                      className="custom-btn mt-4"
                      onClick={() => handleSubmit(formik)}
                    >
                      Account erstellen
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="custom-btn mt-4 disabled-btn"
                      disabled
                    >
                      Account erstellen
                    </button>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <p className="acc-tag">
          Mit * gekennzeichnete Felder sind Pflichtfelder
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default AccountInformationDealer;
