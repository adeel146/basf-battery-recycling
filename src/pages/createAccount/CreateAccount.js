import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Select, { components } from "react-select";
import "../login/login.scss";
import { registerDealerUser } from "../../common/services/UserServices";
import {
  GetCompanyListByName,
  GetLoadingFacility,
} from "../../common/services/AssignmentServices";
import CheckBox from "../../common/ui/CheckBox";
import TextField from "../../common/ui/TextField";
import { inputLimits } from "../../common/constants/constants";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import { trackingView } from "../../common/utils/PageDetails";
import DropDownCustom from "../../common/ui/DropDownCustom";
const msgStyles = {};

const NoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      <span>Bitte Standort eingeben und mit “Enter-Taste” bestätigen.</span>
    </components.NoOptionsMessage>
  );
};
const AccountCreation = () => {
  trackingView({ value: "/register" });
  const [selectedOption, setselectedOption] = useState("");
  const [selectedOptionError, setselectedOptionError] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [facilitiesError, setFacilitiesError] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");
  const [companyList, setcompanyList] = useState([]);
  const [loadingUnloadingArr, setloadingUnloadingArr] = useState([]);
  const [loadingUnloadingVal, setloadingUnloadingVal] = useState("");
  const [loadingUnloadingErrr, setloadingUnloadingErrr] = useState("");
  const [selectInputVal, setselectInputVal] = useState();
  const history = useHistory();
  useEffect(() => {
    window._paq.push(["setUserId", "anonymousUser"]);
    window._paq.push(["trackPageView"]);
    getComapnyList();
  }, [selectInputVal]);
  useEffect(() => {
    GetLoading();
  }, [history]);
  const validate = Yup.object({
    phone: Yup.string().required("Erforderlich"),
    address: Yup.string().required("Erforderlich"),
    city: Yup.string().required("Erforderlich"),
    postalCode: Yup.number()
      .required("Erforderlich")
      .min(1, "Must be greater than 0"),
    wasteGeneratorNumber: Yup.string().required("Erforderlich"),
    contactPersonEmail: Yup.string()
      .email("Ungültige E-Mail")
      .required("Erforderlich"),
    euTaxNumber: Yup.string().required("Erforderlich"),
    startOpeningHours: Yup.string().required("Erforderlich"),
    endOpeningHours: Yup.string().required("Erforderlich"),
    buno: Yup.number().required("Erforderlich"),
  });

  const handleSubmit = async (formik) => {
    if (!selectedOption) {
      setselectedOptionError("Erforderlich");
    }
    if (!loadingUnloadingVal) {
      setloadingUnloadingErrr("Erforderlich");
    }
    if (
      formik.isValid &&
      Object.keys(formik.touched).length > 0 &&
      postalCodeError === "" &&
      selectedOption &&
      loadingUnloadingVal
    ) {
      setButtonLoading(false);
      const formdata = new FormData();
      formdata.append("Email", formik.values.contactPersonEmail);
      formdata.append("CompanyId", selectedOption.id);
      formdata.append("ContactPhone", formik.values.phone);
      formdata.append("Address", formik.values.address);
      formdata.append("City", formik.values.city);
      formdata.append("PostalCode", formik.values.postalCode);
      // formdata.append("Buno", formik.values.buno);
      formdata.append(
        "WasteGeneratorNumber",
        formik.values.wasteGeneratorNumber
      );
      formdata.append("EUTaxNumber", formik.values.euTaxNumber);
      formdata.append("PickupStart", formik.values.startOpeningHours);
      formdata.append("PickupEnd", formik.values.endOpeningHours);
      formdata.append("LoadingFacility", loadingUnloadingVal);
      formdata.append("buno", formik.values.buno);

      let result = await registerDealerUser(formdata);
      if (result?.success) {
        setButtonLoading(true);
        toast.success(result?.message);
        setTimeout(() => {
           history.push("/");
        }, 2500);
      } else {
        setButtonLoading(true);
        toast.error(result?.message);
      }
    }
  };
  const getComapnyList = async () => {
    if (selectInputVal.length > 2) {
      let company = await GetCompanyListByName(selectInputVal);
      if (company?.payLoad?.length > 0) {
        return setcompanyList(company?.payLoad);
      } else {
        toast.error("Firma nicht gefunden");
      }
    }
  };
  const GetLoading = async () => {
    let company = await GetLoadingFacility();
    company = company.map((e) => {
      return { id: e.key, name: e.value };
    });
    setloadingUnloadingArr(company);
  };
  const handleChange = (e, key, formik) => {
    const value = e.target.checked;
    if (key === "Forklift") {
      setFacilitiesError("");
    } else if (key === "Loading Dock") {
      setFacilitiesError("");
    } else if (key === "loadingunloading") {
      setloadingUnloadingErrr("");
      setloadingUnloadingVal(e.target.value);
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
  const handleSelect = (e, key, formik) => {
    console.log(e, "onchange");
    setselectedOptionError("");
    setselectedOption(e);
    console.log(formik, "formik");
    formik.values.address = e.street;
    formik.values.postalCode = e.postalCode;
    formik.values.city = e.city;
    formik.values.buno = e.buno;
  };
  const handleEnter = (e) => {
    e.code === "Enter" && getComapnyList();
  };
  const options = [];
  companyList?.map((i) =>
    options.push({
      id: i.dealerCompanyId,
      label: i.name,
      value: i.dealerCompanyId,
      street: i.address,
      postalCode: i.postalCode,
      city: i.city,
      // buno: i.b  uno,
    })
  );
  console.log(options, "companyList");
  return (
    <div>
      <Sidebar />
      <div className="account-info-container">
        <div className="account-info-page mx-3 d-flex flex-column justify-content-center">
          <Formik
            initialValues={{
              phone: "",
              address: "",
              city: "",
              postalCode: 0,
              wasteGeneratorNumber: "",
              euTaxNumber: "",
              startOpeningHours: "",
              endOpeningHours: "",
            }}
            validationSchema={validate}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form onChange={handleOnChange}>
                <h1 className="my-4">Account Informationen</h1>
                <Row className="account__section">
                  <Col lg={4}>
                    <div className="mt-1">
                      <p
                        style={{
                          margin: "0px",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        Standort*:
                      </p>
                      <Select
                        className="selectvalue"
                        defaultValue={selectedOption}
                        onChange={(e) => handleSelect(e, "select", formik)}
                        options={options}
                        onKeyDown={(e) => handleEnter(e)}
                        name="name"
                        onInputChange={setselectInputVal}
                        components={{ NoOptionsMessage }}
                        styles={{
                          noOptionsMessage: (base) => ({
                            ...base,
                            ...msgStyles,
                          }),
                        }}
                      />
                    </div>
                    {selectedOptionError && (
                      <p className="custom-error">{selectedOptionError}</p>
                    )}
                    <TextField
                      type="email"
                      name="contactPersonEmail"
                      label="E-Mail der Kontaktperson*"
                      padding="1rem 0.5rem"
                      marginTop="1.3rem"
                    />
                    <TextField
                      type="text"
                      name="phone"
                      label="Telefon der Kontaktperson*"
                      padding="1rem 0.5rem"
                      marginTop="1.3rem"
                      maxLength={inputLimits.fifty}
                    />
                    <div>
                      <DropDownCustom
                        label="Be- und Entladeeinrichtungen*"
                        width="330px"
                        list={loadingUnloadingArr}
                        onChange={(e) =>
                          handleChange(e, "loadingunloading", formik)
                        }
                        value={loadingUnloadingVal}
                      />
                      <p className="custom-error">{loadingUnloadingErrr}</p>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <TextField
                      disabled
                      type="text"
                      name="address"
                      label="Adresse*"
                      padding="1rem 0.5rem"
                      maxLength={inputLimits.fifty}
                    />
                    <TextField
                      disabled
                      type="text"
                      name="city"
                      label="Stadt*"
                      padding="1rem 0.5rem"
                      marginTop="1.3rem"
                      maxLength={inputLimits.fifty}
                    />
                    <TextField
                      disabled
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
                    <TextField
                      type="text"
                      name="buno"
                      label="BUNO*"
                      padding="1rem 0.5rem"
                      marginTop="1.3rem"
                      maxLength={inputLimits.seven}
                      onChange={(e) => {
                        let value = e.target.value;
                        const currentValue = value.replace(/[^\d]/g, "");
                        formik.setFieldValue("buno", currentValue);
                      }}
                    />
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
                <p className="mb-0 custom-error">{facilitiesError}</p>
                <div className="d-flex justify-content-end">
                  <div className="d-flex flex-column">
                    <CheckBox
                      label="AGBs akzeptieren"
                      checked={termsAndConditions}
                      onChange={(e) =>
                        handleChange(e, "termsAndConditions", formik)
                      }
                    />
                    {(buttonLoading && formik.isValid && formik.dirty) ||
                    formik.isSubmitting ? (
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
                    {!termsAndConditions && (
                      <p style={{ color: "red", fontSize: "10px" }}>
                        Die AGBs müssen akzeptiert werden.
                      </p>
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
      <Footer />
    </div>
  );
};

export default AccountCreation;
