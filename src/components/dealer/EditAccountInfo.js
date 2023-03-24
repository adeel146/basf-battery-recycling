import React, { useEffect, useState } from "react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Col, Row } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import { GetLoadingFacility } from "../../common/services/AssignmentServices";
import {
  editAccountInfo,
  getUserProfile,
} from "../../common/services/UserServices";
import TextField from "../../common/ui/TextField";
import { inputLimits } from "../../common/constants/constants";
import Dropdown from "../../common/ui/DropDown";
import PropTypes from "prop-types";

const EditAccountInfo = (props) => {
  const [loadingUnloadingVal, setloadingUnloadingVal] = useState("");
  const [initialValues, setInitialValues] = useState({});
  const [loadingUnloadingErrr, setloadingUnloadingErrr] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [forklift, setForklift] = useState(false);
  const [loadingDock, setLoadingDock] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState("");
  const [loadingUnloadingArr, setloadingUnloadingArr] = useState([]);
  console.log(loadingUnloadingVal, "loadingUnloadingVal");
  useEffect(() => {
    GetLoading();
    const getProfile = async () => {
      let result = await getUserProfile();
      if (result?.success) {
        result = result?.payLoad;
        setInitialValues(result);

        setloadingUnloadingVal(result?.payLoad?.loadingFacility);
      } else {
        toast.error(result?.message);
      }
    };
    getProfile();
  }, []);

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
    if (!loadingUnloadingVal) {
      setloadingUnloadingErrr("Erforderlich");
    }
    if (
      formik.isValid &&
      Object.keys(formik.touched).length > 0 &&
      postalCodeError === "" &&
      loadingUnloadingErrr === ""
    ) {
      setButtonLoading(true);
      let obj = {
        Type: "dealercompany",
        Name: formik.values.name,
        payLoad: {
          email: initialValues?.payLoad?.email,
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
          LoadingFacility: loadingUnloadingVal,
        },
      };
      let result = await editAccountInfo(obj);
      if (result?.success) {
        setButtonLoading(false);
        toast.success(result?.message);
      } else {
        setButtonLoading(false);
        toast.error(result);
      }
    }
  };
  const handleChange = (e, key) => {
    const value = e.target.checked;
    if (key === "Forklift") {
      setForklift(value);
    } else if (key === "loadingunloading") {
      setloadingUnloadingErrr("");
      setloadingUnloadingVal(e.target.value);
    } else if (key === "Loading Dock") {
      setLoadingDock(value);
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
  const GetLoading = async () => {
    let company = await GetLoadingFacility();
    company = company.map((e) => {
      return { id: e.key, name: e.value };
    });
    setloadingUnloadingArr(company);
  };
  const { reset } = props;
  
  return (
    <div className="change-settings-card mb-5 h-100">
      <div className="heading d-flex flex-column">
        <div className="d-flex align-items-center mb-5">
          <FontAwesomeIcon icon={faChevronLeft} onClick={reset} size="2x" />
          <h1 className="mb-0 ms-3">Account informationen bearbeiten</h1>
        </div>
        <Formik
          initialValues={{
            name: initialValues?.payLoad?.name
              ? initialValues?.payLoad?.name
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
              <Row>
                <Col lg={4} md={6}>
                  <div className="left-col">
                    <TextField
                      type="text"
                      name="name"
                      label="Firmenname"
                      padding="1rem 0.5rem"
                      maxLength={inputLimits.fifty}
                      disabled
                    />
                    <TextField
                      type="email"
                      name="contactPersonEmail"
                      label="E-Mail der Kontaktperson"
                      padding="1rem 0.5rem"
                      marginTop="1.3rem"
                      value={initialValues?.payLoad?.email}
                      disabled
                    />
                    <TextField
                      type="text"
                      name="phone"
                      label="Telefon der Kontaktperson"
                      padding="1rem 0.5rem"
                      marginTop="1.3rem"
                      maxLength={inputLimits.fifty}
                    />
                    <Dropdown
                      label="Be- und Entladeeinrichtungen"
                      width="330px"
                      list={loadingUnloadingArr}
                      onChange={(e) =>
                        handleChange(e, "loadingunloading")
                      }
                      value={loadingUnloadingVal}
                    />
                    {loadingUnloadingErrr && (
                      <p className="custom-error">{loadingUnloadingErrr}</p>
                    )}
                    <div className="edit-info-btn">
                      {!buttonLoading ? (
                        <button
                          type="submit"
                          className="mt-5"
                          onClick={() => handleSubmit(formik)}
                        >
                          Speichern
                        </button>
                      ) : (
                        <button type="submit" className="mt-5 btn-disabled">
                          Speichern
                        </button>
                      )}
                    </div>
                  </div>
                </Col>
                <Col lg={4} md={6}>
                  <TextField
                    type="text"
                    name="address"
                    label="Adresse"
                    padding="1rem 0.5rem"
                    maxLength={inputLimits.fifty}
                    disabled
                  />
                  <TextField
                    type="text"
                    name="city"
                    label="Stadt"
                    padding="1rem 0.5rem"
                    marginTop="1.3rem"
                    maxLength={inputLimits.fifty}
                    disabled
                  />
                  <TextField
                    type="number"
                    name="postalCode"
                    label="Postleitzahl"
                    padding="1rem 0.5rem"
                    marginTop="1.3rem"
                    maxLength={inputLimits.five}
                    disabled
                  />
                  <p
                    className="text-danger"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    {postalCodeError}
                  </p>
                  <TextField
                    type="text"
                    name="wasteGeneratorNumber"
                    label="Abfallerzeugernummer"
                    padding="1rem 0.5rem"
                    marginTop="1.3rem"
                    maxLength={inputLimits.fifty}
                  />
                  <TextField
                    type="text"
                    name="euTaxNumber"
                    label="EU Steuernummer"
                    padding="1rem 0.5rem"
                    marginTop="1.3rem"
                    maxLength={inputLimits.fifty}
                  />
                  <Row>
                    <Col lg={6}>
                      <TextField
                        type="time"
                        name="startOpeningHours"
                        label="Öffnungszeiten"
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
                  {!buttonLoading ? (
                    <button
                      type="submit"
                      className="for-mobile mt-5"
                      onClick={() => handleSubmit(formik)}
                    >
                      Speichern
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="for-mobile mt-5 btn-disabled"
                    >
                      Speichern
                    </button>
                  )}
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
      <Toaster />
    </div>
  );
};
EditAccountInfo.propTypes = {
  reset: PropTypes.any,
};
export default EditAccountInfo;
