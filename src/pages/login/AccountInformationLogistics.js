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
import Dropdown from "../../common/ui/DropDown";
import TextField from "../../common/ui/TextField";
import { inputLimits } from "../../common/constants/constants";
import {trackingView} from "../../common/utils/PageDetails";

const AccountInformationLogistics = () => {
  trackingView({"value":"/settings"});
  const history = useHistory();
  const [initialValues, setInitialValues] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [EFBCertificateId, setEFBCertificateId] = useState(true);
  const [batteryPickupStatusType, setBatteryPickupStatusType] = useState("1");
  const [EFBCertificateValue, setEFBCertificateValue] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState("");

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
          let values = result?.payLoad;
          setInitialValues(values);
          setBatteryPickupStatusType(values?.payLoad?.batteryPickupStatusType);
          if (values?.payLoad?.EFBCertificateId) {
            setEFBCertificateId("Yes");
          } else {
            setEFBCertificateId("No");
          }
        } else {
        }
      };
      getProfile();
    }
  }, [history]);

  const validate = Yup.object({
    Name: Yup.string().required("Erforderlich"),
    City: Yup.string().required("Erforderlich"),
    OrderEmail: Yup.string()
      .required("Erforderlich")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Muss eine gültige E-Mail-Adresse sein"
      ),
    EUTaxNumber: Yup.string().required("Erforderlich"),
    Phone: Yup.string().required("Erforderlich"),
    Address: Yup.string().required("Erforderlich"),
    PostalCode: Yup.number()
      .required("Erforderlich")
      .min(1, "Must be greater than 0"),
    EquipmentAtTruck: Yup.string().required("Erforderlich"),
    DisposalCertificate: Yup.string().required("Erforderlich"),
    RequiredChargingFacilities: Yup.string().required("Erforderlich"),
  });
  const handleChange = (e, key) => {
    let value = e.target.value;
    if (key === "EFBCertificateId") {
      setEFBCertificateId(value);
      if (+EFBCertificateId !== 1) {
        setEFBCertificateValue(true);
      } else {
        setEFBCertificateValue(false);
      }
    } else if (key === "batteryPickupStatusType") {
      setBatteryPickupStatusType(value);
    }
  };
  const handleSubmit = async (formik) => {
    if (
      formik.isValid &&
      Object.keys(formik.touched).length > 0 &&
      postalCodeError === ""
    ) {
      setButtonLoading(true);
      let obj = {
        Type: "transportationcompany",
        Name: formik.values.Name,
        PayLoad: {
          Address: formik.values.Address,
          City: formik.values.City,
          Email: localStorage.getItem("companyMail"),
          OrderEmail: formik.values.OrderEmail,
          EFBCertificateId: EFBCertificateValue,
          BatteryPickupStatusType: batteryPickupStatusType,
          DisposalCertificate: formik.values.DisposalCertificate,
          EUTaxNumber: formik.values.EUTaxNumber,
          Phone: formik.values.Phone,
          PostalCode: formik.values.PostalCode,
          EquipmentAtTruck: formik.values.EquipmentAtTruck,
          RequiredChargingFacilities: formik.values.RequiredChargingFacilities,
          TransportationCompanyId:
            initialValues?.payLoad?.transportationCompanyId,
        },
      };

      let result = await editAccountInfo(obj);
      if (result?.success) {
        setButtonLoading(false);
        toast.success(result?.message);
        setTimeout(() => {
          history.push("/assignments");
        }, 2500);
      } else {
        setButtonLoading(false);
        toast.error(result?.message);
      }
    }
  };
  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "PostalCode" && value.length > inputLimits.five) {
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
            Name: localStorage.getItem("companyName"),
            City: initialValues?.payLoad?.city
              ? initialValues?.payLoad?.city
              : "",
            EUTaxNumber: initialValues?.payLoad?.euTaxNumber
              ? initialValues?.payLoad?.euTaxNumber
              : "",
            OrderEmail: initialValues?.payLoad?.orderEmail
              ? initialValues?.payLoad?.orderEmail
              : "",
            Phone: initialValues?.payLoad?.phone
              ? initialValues?.payLoad?.phone
              : "",
            Address: initialValues?.payLoad?.address
              ? initialValues?.payLoad?.address
              : "",
            PostalCode: initialValues?.payLoad?.postalCode
              ? initialValues?.payLoad?.postalCode
              : 0,
            EquipmentAtTruck: initialValues?.payLoad?.equipmentAtTruck
              ? initialValues?.payLoad?.equipmentAtTruck
              : "",
            DisposalCertificate: initialValues?.payLoad?.disposalCertificate
              ? initialValues?.payLoad?.disposalCertificate
              : "",
            RequiredChargingFacilities: initialValues?.payLoad
              ?.requiredChargingFacilities
              ? initialValues?.payLoad?.requiredChargingFacilities
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
                    name="Name"
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
                    disabled
                    value={localStorage.getItem("companyMail")}
                  />
                  <TextField
                    type="email"
                    name="OrderEmail"
                    label="E-Mail zur Bestellabwicklung*"
                    padding="1rem 0.5rem"
                    marginTop="1.3rem"
                  />
                  <TextField
                    type="text"
                    name="Phone"
                    label="Telefon der Kontaktperson*"
                    padding="1rem 0.5rem"
                    marginTop="1.3rem"
                    maxLength={inputLimits.fifty}
                  />
                  <TextField
                    type="text"
                    name="EquipmentAtTruck"
                    label="Eigenes Equipment auf dem LKW*"
                    padding="1rem 0.5rem"
                    marginTop="1.3rem"
                  />
                </Col>
                <Col lg={4}>
                  <TextField
                    type="text"
                    name="Address"
                    label="Adresse*"
                    padding="1rem 0.5rem"
                    maxLength={inputLimits.fifty}
                  />
                  <TextField
                    type="text"
                    name="City"
                    label="Stadt*"
                    padding="1rem 0.5rem"
                    marginTop="1.3rem"
                    maxLength={inputLimits.fifty}
                  />
                  <TextField
                    type="number"
                    name="PostalCode"
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
                  <Dropdown
                    width="100%"
                    label="Batteriestatus bei Abholung*"
                    list={
                      JSON.parse(localStorage.getItem("dashboardData"))
                        ?.batteryPickupStatusType
                    }
                    onChange={(e) => handleChange(e, "batteryPickupStatusType")}
                    value={batteryPickupStatusType}
                    company={true}
                  />
                </Col>
                <Col lg={4}>
                  <TextField
                    type="text"
                    name="RequiredChargingFacilities"
                    label="Erforderliche Ladeeinrichtungen*"
                    padding="1rem 0.5rem"
                    maxLength={inputLimits.fifty}
                  />
                  <Dropdown
                    width="100%"
                    label="EFB Zertifikat*"
                    list={[
                      { key: 1, value: "Yes" },
                      { key: 2, value: "No" },
                    ]}
                    onChange={(e) => handleChange(e, "EFBCertificateId")}
                    value={EFBCertificateId}
                    company={true}
                  />

                  <TextField
                    type="text"
                    name="DisposalCertificate"
                    label="Sammelentsorgungsnachweis vorhanden für*"
                    padding="1rem 0.5rem"
                    marginTop="1.8rem"
                  />
                  <TextField
                    type="text"
                    name="EUTaxNumber"
                    label="Umsatzsteuer ID*"
                    padding="1rem 0.5rem"
                    marginTop="1.3rem"
                  />
                </Col>
              </Row>
              {!buttonLoading ? (
                <button
                  type="submit"
                  className="custom-btn float-end mt-5"
                  onClick={() => handleSubmit(formik)}
                >
                  Account erstellen
                </button>
              ) : (
                <button
                  type="submit"
                  className="custom-btn float-end mt-5 btn-disabled"
                >
                  Account erstellen
                </button>
              )}
            </Form>
          )}
        </Formik>
        <p className="mb-5 info-tag">
          Mit * gekennzeichnete Felder sind Pflichtfelder
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default AccountInformationLogistics;
