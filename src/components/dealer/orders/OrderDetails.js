import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Col, Row, Spinner, Tooltip, OverlayTrigger } from "react-bootstrap";
import {
  HochvoltspeicherAuto,
  minus,
  plus,
  _542f61af_478c_48df_af9e_fbcb0337c155,
} from "../../../common/constants/constants";
import { placeNewOrder } from "../../../common/services/OrderServices";
import CheckBox from "../../../common/ui/CheckBox";
import DropDown from "../../../common/ui/DropDown";
import TextField from "../../../common/ui/TextField";
import {
  getServiceType,
  getThemeContent,
} from "../../../common/utils/Utilities";
import ErrorMessage from "../../../common/modals/ErrorMessage";
import SuccessMessage from "../../../common/modals/SuccessMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const OrderDetails = (props) => {
  const {
    detailsForm,
    detailsLoading,
    dashboardData,
    close,
    productId,
    cartItemLength,
    dummyCartItemLength,
  } = props;

  const [buttonLoading, setButtonLoading] = useState(true);
  const [enableUNCode, setEnableUNCode] = useState(false);
  const [unknown, setunknown] = useState(false);

  const [count, setCount] = useState(1);
  const [batteryCondition, setBatteryCondition] = useState("");
  const [batteryFile, setBatteryFile] = useState("");
  const [batteryImage, setBatteryImage] = useState({});
  const [transportFile, setTransportFile] = useState("");
  const [transportImage, setTransportImage] = useState({});
  const [selectivePackagingTypeList, setSelectivePackagingTypeList] = useState(
    []
  );
  const file = useRef();
  const document = useRef();
  const [packagingType, setPackagingType] = useState("");
  const [Category, setCategory] = useState("");
  const [errorBatteryCondition, setErrorBatteryCondition] = useState("");
  const [errorBatteryFile, setErrorBatteryFile] = useState("");
  const [errorTransportFile, setErrorTransportFile] = useState("");
  const [errorPackagingType, setErrorPackagingType] = useState("");
  const [dummyChargeLevel, setDummyChargeLevel] = useState(0);

  const [errorModal, setErrorModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const validate = Yup.object({
    chargeLevel: Yup.number()
      .min(0, "Must be 0 or greater")
      .max(100, "Must be 100 or less"),
    unCode: Yup.string(),
  });

  useEffect(() => {
    if (
      batteryCondition &&
      (transportFile || Category !== HochvoltspeicherAuto) &&
      packagingType
    ) {
      setButtonLoading(false);
    } else if (transportFile && batteryCondition && dummyChargeLevel >= 0) {
      setButtonLoading(false);
    } else {
      setButtonLoading(true);
    }
    if (
      batteryCondition === _542f61af_478c_48df_af9e_fbcb0337c155 &&
      !batteryFile
    ) {
      setButtonLoading(true);
    }
    if (
      dummyChargeLevel < 0 ||
      dummyChargeLevel === "" ||
      dummyChargeLevel > 100
    ) {
      setButtonLoading(true);
    }
    if (getServiceType() === "packaging") {
      setButtonLoading(false);
    }
  }, [
    enableUNCode,
    batteryCondition,
    batteryFile,
    transportFile,
    packagingType,
    dummyChargeLevel,
    Category,
  ]);

  const handleDropdownChange = (value) => {
    let newValues = [];
    setBatteryCondition(value);
    for (let i = 0; i < dashboardData?.cartPackagingType.length; i++) {
      const element = dashboardData?.cartPackagingType[i];
      if (element?.id === "90362cfd-2867-4e31-98c9-957fe7f42f85") {
        newValues.push(element);
      }
    }
    setSelectivePackagingTypeList([...newValues]);
  };
  const batteryConditionChange = (value) => {
    if (value === "c842b716-8928-41a5-9873-e11dddc9fe63") {
      let newValues = [];
      setBatteryCondition(value);
      for (let i = 0; i < dashboardData?.cartPackagingType.length; i++) {
        const element = dashboardData?.cartPackagingType[i];
        if (
          element?.id === "4bc0c1cf-dd80-42f5-ac5c-0dc9e5c4bc9e" ||
          element?.id === "787d8c64-0dca-458c-92c1-a68602def701"
        ) {
          newValues.push(element);
        }
      }
      setSelectivePackagingTypeList([...newValues]);
    } else if (value === "b120e017-2b79-45ed-a3b5-b7bbbd83a351") {
      let newValues = [];
      setBatteryCondition(value);
      for (let i = 0; i < dashboardData?.cartPackagingType.length; i++) {
        const element = dashboardData?.cartPackagingType[i];
        if (element?.id === "d5ff8d22-f49a-4b28-84a1-35d07cddab3f") {
          newValues.push(element);
        }
      }
      setSelectivePackagingTypeList([...newValues]);
    } else if (value === _542f61af_478c_48df_af9e_fbcb0337c155) {
      handleDropdownChange(value);
    }
  };

  function validateSize(e) {
    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 30) {
      toast.error("maximal 30mb erlaubt");
    } else {
      const file = e.target.files[0];
      setTransportFile(file.name);
      setTransportImage(file);
      setErrorTransportFile("");
    }
  }
  const handleChange = (e, key, formik) => {
    let value = e.target.value;
    let file;
    switch (key) {
      case minus:
        if (count > 1) {
          setCount(count - 1);
        }
        break;
      case plus:
        setCount(count + 1);
        break;
      case "unknown":
        setunknown(!unknown);
        formik.values.chargeLevel = 0;
        break;
      case "batteryCondition":
        setErrorBatteryCondition("");
        batteryConditionChange(value);
        break;
      case "packagingType":
        setPackagingType(value);
        setErrorPackagingType("");
        break;
      case "batteryFile":
        setErrorBatteryFile("");
        file = e.target.files[0];
        setBatteryFile(file.name);
        setBatteryImage(file);
        break;
      case "transport certificate":
        validateSize(e);
        break;
      case "delFile":
        console.log(e.target.files, "e");
        file = e.target.files[0];
        break;
      default:
        break;
    }
  };

  const SendData = async (formik) => {
    if (
      (batteryCondition &&
        (transportFile || Category !== HochvoltspeicherAuto) &&
        packagingType) ||
      (batteryCondition &&
        (transportFile || Category !== HochvoltspeicherAuto) &&
        batteryCondition === _542f61af_478c_48df_af9e_fbcb0337c155)
    ) {
      let obj;

      obj = {
        ProductId: productId,
        baterryConditionId: batteryCondition,
        BaterryImage: batteryImage,
        TransportabilCertificate: transportImage,
        packagingTypeId: packagingType,
        quantity: count,
        ladestand: Math.ceil(formik.values.chargeLevel),
        unCode: formik.values.unCode,
        unknown: unknown,
      };
      let form_data = new FormData();

      Object.keys(obj).map((key) => {
        form_data.append(`model[0].${key}`, obj[key]);
        return form_data;
      });
      setButtonLoading(true);
      let result = await placeNewOrder(form_data);
      if (result?.success) {
        cartItemLength();
        setButtonLoading(false);
        close();
        setBatteryImage({});
        setTransportImage({});
        setBatteryCondition("");
        setBatteryFile("");
        setTransportFile("");
        setPackagingType("");
        setCount(1);
        setEnableUNCode(false);
        formik.resetForm();
        setSuccessModal(true);

        setResponseMessage(
          "Sie können weitere Produkte hinzufügen oder den Checkout vornehmen."
        );
      } else {
        setButtonLoading(false);
        setResponseMessage(result?.message);
        setErrorModal(true);
      }
    }
  };
  const handleSubmit = async (formik) => {
    if (getServiceType() === "pickUp") {
      if (!batteryCondition) {
        setErrorBatteryCondition("Erforderlich");
      }
      if (batteryCondition === _542f61af_478c_48df_af9e_fbcb0337c155) {
        // setErrorBatteryFile("Erforderlich");
      }
      if (!transportFile && Category === HochvoltspeicherAuto) {
        setErrorTransportFile("Erforderlich");
      }
      if (
        !packagingType &&
        batteryCondition !== _542f61af_478c_48df_af9e_fbcb0337c155
      ) {
        setErrorPackagingType("Erforderlich");
      }
      SendData(formik);
    } else {
      let product = JSON.parse(localStorage.getItem("currentProductDetails"));
      let payLoad = [
        {
          Sachnummer: product?.itemNumber,
          Beschreibung: "Paloxe",
          Abmessungen: "1200x800x144",
          Innenmaß: "1200x800x144",
          Gewicht: "25",
          MaximaleTraglast: "250",
          Preis: "30",
          quantity: count,
        },
      ];
      localStorage.setItem("dummyCartItem", JSON.stringify(payLoad));
      setSuccessModal(true);
      setResponseMessage(
        "Sie können weitere Produkte hinzufügen oder den Checkout vornehmen."
      );
      dummyCartItemLength();
      setTimeout(() => {
        close();
      }, 2500);
    }
  };

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "chargeLevel") {
      setDummyChargeLevel(value);
    }
  };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Das Netto Gewicht in kg bezieht sich auf das Batteriegewicht ohne
      Verpackungen.
    </Tooltip>
  );
  const clearImage = (e) => {
    file.current.value = "";
    setBatteryImage("");
    setBatteryFile("");
  };
  const clearDocument = () => {
    document.current.value = "";
    setTransportFile("");
    setTransportImage({});
  };
  return (
    <>
      <div
        className="details-card updateDesign"
        style={{
          border: `1px solid ${getThemeContent().color}`,
        }}
      >
        {!detailsLoading ? (
          <Formik
            initialValues={{
              chargeLevel: 0,
              unCode: "",
            }}
            validationSchema={validate}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form onChange={handleOnChange}>
                <Row>
                  <div className="col-lg-12">
                    <h3>Produkteigenschaften</h3>
                    <Row>
                      <Col lg={7}>
                        <div className="properties ps-3">
                          {getServiceType() === "pickUp"
                            ? detailsForm.map((item, index) => (
                                <Row key={index}>
                                  <Col lg={4} md={6} sm={4} className="ps-0">
                                    <p className="mb-2">
                                      {item.name === "Kategorie"
                                        ? setCategory(item.value)
                                        : ""}
                                      {item.name === "Netto Gewicht [kg]" ? (
                                        <OverlayTrigger
                                          placement="right"
                                          delay={{ show: 250, hide: 400 }}
                                          overlay={renderTooltip}
                                        >
                                          <b>{item.name}:</b>
                                        </OverlayTrigger>
                                      ) : (
                                        <b>{item.name}:</b>
                                      )}
                                    </p>
                                  </Col>
                                  <Col lg={6} md={6} sm={4}>
                                    <p className="mb-2">
                                      <span>{item.value}</span>
                                    </p>
                                  </Col>
                                </Row>
                              ))
                            : detailsForm.slice(0, 5).map((item) => (
                                <p className="mb-2" key={item.id}>
                                  <b>{item.name}:</b> <span>{item.value}</span>
                                </p>
                              ))}
                        </div>
                      </Col>
                      {getServiceType() === "pickUp" && (
                        <>
                          <Col lg={5}>
                            <div className="battery-form">
                              <DropDown
                                label="Transportfähigkeitszustand*:"
                                list={dashboardData?.batteryCondition}
                                onChange={(e) =>
                                  handleChange(e, "batteryCondition")
                                }
                                value={batteryCondition}
                              />
                              <p className="mb-0 custom-error">
                                {errorBatteryCondition}
                              </p>

                              <label>
                                Foto der Batterie
                                {batteryCondition ===
                                "542f61af-478c-48df-af9e-fbcb0337c155"
                                  ? "*"
                                  : ""}
                                :
                              </label>
                              <br />
                              <div className="search-field position-relative overflow-hidden d-inline-block">
                                <input
                                  ref={file}
                                  id="file"
                                  type="file"
                                  placeholder="Search..."
                                  className={`position-absolute opacity-0 top-0 start-0 `}
                                  onChange={(e) =>
                                    handleChange(e, "batteryFile")
                                  }
                                  accept="image/x-png,image/jpeg,image/gif"
                                />
                                <p className="mb-0">
                                  {batteryFile && batteryFile.slice(0, 25)}
                                </p>
                                {!batteryImage.name ? (
                                  <img
                                    src="/assets/icons/upload.png"
                                    alt="upload"
                                    style={{
                                      marginTop:
                                        batteryFile.length > 0 && "-1.15rem",
                                    }}
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    style={{
                                      position: "absolute",
                                      top: "7px",
                                      right: "4px",
                                      cursor: "pointer",
                                      zIndex: 9999,
                                      color: "red",
                                    }}
                                    icon={faTrash}
                                    onClick={clearImage}
                                  />
                                )}
                              </div>
                              <p className="mb-0 custom-error battery-file">
                                {errorBatteryFile}
                              </p>

                              <TextField
                                disabled={unknown === true}
                                type="number"
                                name="chargeLevel"
                                label="Ladezustand [%]*:"
                                padding="0.1rem 0.5rem"
                                min={0}
                              />
                              <div className="d-flex un-code">
                                <CheckBox
                                  checked={unknown}
                                  onChange={(e) =>
                                    handleChange(e, "unknown", formik)
                                  }
                                  padding="0.75rem"
                                />
                                <p style={{ marginTop: "14px" }}>Unbekannt</p>
                              </div>

                              <DropDown
                                label="Verpackungsarten*:"
                                list={selectivePackagingTypeList}
                                onChange={(e) =>
                                  handleChange(e, "packagingType")
                                }
                                value={packagingType}
                              />
                              <p className="mb-0 custom-error">
                                {errorPackagingType}
                              </p>

                              {Category === "Hochvoltspeicher Auto" && (
                                <>
                                  <label>
                                    Transportfähigkeitsbescheinigung*:
                                  </label>
                                  <div className="search-field position-relative overflow-hidden d-inline-block">
                                    <input
                                      type="file"
                                      ref={document}
                                      onChange={(e) =>
                                        handleChange(e, "transport certificate")
                                      }
                                      placeholder="Search..."
                                      className={`position-absolute opacity-0 top-0 start-0 `}
                                      accept="application/pdf"
                                    />
                                    <p className="mb-0">
                                      {transportFile.slice(0, 25)}
                                    </p>
                                    {transportFile.length > 0 ? (
                                      <FontAwesomeIcon
                                        onClick={clearDocument}
                                        style={{
                                          position: "absolute",
                                          top: "7px",
                                          right: "4px",
                                          cursor: "pointer",
                                          zIndex: 9999,
                                          color: "red",
                                        }}
                                        icon={faTrash}
                                      />
                                    ) : (
                                      <img
                                        src="/assets/icons/upload.png"
                                        alt="upload"
                                        style={{
                                          marginTop:
                                            transportFile.length > 0 &&
                                            "-1.15rem",
                                        }}
                                      />
                                    )}
                                  </div>
                                </>
                              )}
                              <p className="mb-0 custom-error battery-file">
                                {errorTransportFile}
                              </p>
                            </div>
                          </Col>
                        </>
                      )}
                    </Row>
                  </div>
                </Row>
                <div className="quantity d-flex align-items-center mt-4">
                  <label className="me-3">Anzahl Batterien</label>
                  <br />
                  <div className="d-flex flex-wrap">
                    <div
                      className="quantity-card d-flex"
                      style={{
                        border: `1px solid ${getThemeContent().color}`,
                      }}
                    >
                      <div
                        className="minus"
                        onClick={(e) => {
                          handleChange(e, minus);
                        }}
                        style={{
                          borderRight: `1px solid ${getThemeContent().color}`,
                        }}
                      >
                        <img src="/assets/icons/minus.png" alt="minus" />
                      </div>
                      <div className="count">
                        <b>{count}</b>
                      </div>
                      <div
                        className="plus"
                        onClick={(e) => {
                          handleChange(e, plus);
                        }}
                        style={{
                          borderLeft: `1px solid ${getThemeContent().color}`,
                        }}
                      >
                        <img src="/assets/icons/plus.png" alt="plus" />
                      </div>
                    </div>
                    {!buttonLoading ? (
                      <button
                        type="submit"
                        onClick={() => handleSubmit(formik)}
                        style={{
                          backgroundColor: getThemeContent().color,
                        }}
                      >
                        Hinzufügen
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn-disabled"
                        style={{
                          backgroundColor: getThemeContent().color,
                        }}
                      >
                        Hinzufügen
                      </button>
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              height: "20vh",
            }}
          >
            <Spinner animation="border" />
          </div>
        )}
        <div
          className="d-flex justify-content-end mt-5"
          style={{
            fontSize: "10px",
          }}
        >
          {getServiceType() === "pickUp" && (
            <p className="mb-0">
              Mit * gekennzeichnete Felder sind Pflichtfelder
            </p>
          )}
        </div>
        <ErrorMessage
          show={errorModal}
          close={() => {
            setErrorModal(false);
          }}
          message={responseMessage}
        />
        <SuccessMessage
          show={successModal}
          close={() => {
            setSuccessModal(false);
          }}
          message={responseMessage}
        />
      </div>
    </>
  );
};
OrderDetails.propTypes = {
  detailsForm: PropTypes.any,
  detailsLoading: PropTypes.any,
  dashboardData: PropTypes.any,
  close: PropTypes.any,
  categoryName: PropTypes.any,
  productId: PropTypes.any,
  cartItemLength: PropTypes.any,
  dummyCartItemLength: PropTypes.any,
};
export default OrderDetails;
