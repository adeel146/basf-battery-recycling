import React, { useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Col, Row, Modal, Tooltip, OverlayTrigger } from "react-bootstrap";
import "./modals.scss";
import {
  minus,
  plus,
  _542f61af_478c_48df_af9e_fbcb0337c155,
  _90362cfd_2867_4e31_98c9_957fe7f42f85,
  _b120e017_2b79_45ed_a3b5_b7bbbd83a351,
  _c842b716_8928_41a5_9873_e11dddc9fe63,
  _d5ff8d22_f49a_4b28_84a1_35d07cddab3f,
} from "../constants/constants";
import CheckBox from "../ui/CheckBox";
import DropDown from "../ui/DropDown";
import TextField from "../ui/TextField";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { updateAssignment } from "../services/AssignmentServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
const UpdateAssignementDetails = (props) => {
  let { orderDetails, close, show, setCheckChangesTrue } = props;
  const file = useRef();
  const document = useRef();
  const [count, setCount] = useState(1);
  const [batteryCondition, setBatteryCondition] = useState("");
  const [unknown, setunknown] = useState(false);
  const [batteryFile, setBatteryFile] = useState("");
  const [batteryImage, setBatteryImage] = useState({});
  const [transportFile, setTransportFile] = useState("");
  const [transportImage, setTransportImage] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [packagingType, setPackagingType] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({});
  const [chargeLevel, setchargeLevel] = useState(0);

  const [errorModal, setErrorModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [selectivePackagingTypeList, setSelectivePackagingTypeList] = useState(
    []
  );
  const validate = Yup.object({
    unCode: Yup.string(),
    chargeLevel: Yup.number()
      .min(0, "Must be 0 or greater")
      .max(100, "Must be 100 or less"),
  });

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "chargeLevel") {
      setchargeLevel(value);
    }
  };

  const batteryConditionValidationEffectLast = () => {
    let newValues = [];
    setBatteryCondition(orderDetails?.batteryConditionId);
    for (let i = 0; i < dashboardData?.cartPackagingType.length; i++) {
      const element = dashboardData?.cartPackagingType[i];
      if (element?.id === _90362cfd_2867_4e31_98c9_957fe7f42f85) {
        newValues.push(element);
      }
    }
    setSelectivePackagingTypeList([...newValues]);
  };

  const batteryConditionValidationEffect = () => {
    if (
      orderDetails?.batteryConditionId === _c842b716_8928_41a5_9873_e11dddc9fe63
    ) {
      let newValues = [];
      setBatteryCondition(orderDetails?.batteryConditionId);
      for (let i = 0; i < dashboardData?.cartPackagingType.length; i++) {
        const element = dashboardData?.cartPackagingType[i];

        if (
          element?.id !== _90362cfd_2867_4e31_98c9_957fe7f42f85 &&
          element?.id !== _d5ff8d22_f49a_4b28_84a1_35d07cddab3f
        ) {
          newValues.push(element);
        }
      }
      setSelectivePackagingTypeList([...newValues]);
    } else if (
      orderDetails?.batteryConditionId === _b120e017_2b79_45ed_a3b5_b7bbbd83a351
    ) {
      let newValues = [];
      setBatteryCondition(orderDetails?.batteryConditionId);
      for (let i = 0; i < dashboardData?.cartPackagingType.length; i++) {
        const element = dashboardData?.cartPackagingType[i];
        if (element?.id === "787d8c64-0dca-458c-92c1-a68602def701") {
          newValues.push(element);
        }
      }
      setSelectivePackagingTypeList([...newValues]);
    } else if (
      orderDetails?.batteryConditionId === _542f61af_478c_48df_af9e_fbcb0337c155
    ) {
      batteryConditionValidationEffectLast();
    }
  };
  useEffect(() => {
    setCount(orderDetails?.quantity);
    setBatteryCondition(orderDetails?.batteryConditionId);
    setPackagingType(orderDetails?.packagingTypeId);
    setunknown(orderDetails?.unknown);
    setBatteryFile(orderDetails?.baterryImageName);
    setBatteryImage(orderDetails?.baterryImageName);
    setTransportFile(orderDetails?.transportabilityCertificateName);
    setTransportImage(orderDetails?.transportabilityCertificateName);

    setInitialValues({
      unCode: orderDetails?.unCode?.length > 0 ? orderDetails?.unCode : "",
      chargeLevel: orderDetails?.ladestand,
    });

    let dashboardData = JSON.parse(localStorage.getItem("dashboardData"));
    setDashboardData(dashboardData);
    batteryConditionValidationEffect();
  }, [orderDetails]);
  useEffect(() => {
    if (chargeLevel < 0 || chargeLevel === "" || chargeLevel > 100) {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  }, [chargeLevel]);

  const batteryConditionCaseLast = (value) => {
    let newValues = [];
    setBatteryCondition(value);
    for (let i = 0; i < dashboardData?.cartPackagingType.length; i++) {
      const element = dashboardData?.cartPackagingType[i];
      if (element?.id === "90362cfd-2867-4e31-98c9-957fe7f42f85") {
        newValues.push(element);
      }
    }
    setSelectivePackagingTypeList([...newValues]);
    if (!batteryFile) {
      setButtonLoading(true);
    }
  };

  const batteryConditionCase = (value) => {
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
      setButtonLoading(false);
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
      setButtonLoading(false);
    } else if (value === _542f61af_478c_48df_af9e_fbcb0337c155) {
      batteryConditionCaseLast(value);
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
        batteryConditionCase(value);

        if (value === "b120e017-2b79-45ed-a3b5-b7bbbd83a351") {
          setPackagingType("d5ff8d22-f49a-4b28-84a1-35d07cddab3f");
        } else if (value === "c842b716-8928-41a5-9873-e11dddc9fe63") {
          setPackagingType("4bc0c1cf-dd80-42f5-ac5c-0dc9e5c4bc9e");
        } else if (value === _542f61af_478c_48df_af9e_fbcb0337c155) {
          setPackagingType("90362cfd-2867-4e31-98c9-957fe7f42f85");
        }
        console.log(packagingType);
        break;
      case "packagingType":
        setPackagingType(value);
        break;
      case "batteryFile":
        file = e.target.files[0];
        setBatteryFile(file.name);
        setBatteryImage(file);
        setButtonLoading(false);

        break;
      case "transport certificate":
        validateSize(e);

        break;
      default:
        break;
    }
  };
  const handleSubmit = async (formik) => {
    let obj = {
      orderItemId: orderDetails?.orderItemId,
      ProductId: orderDetails?.productId,
      BaterryConditionId: batteryCondition,
      BaterryImage: batteryImage,
      TransportabilCertificate: transportImage,
      PackagingTypeId: packagingType,
      Quantity: count,
      Ladestand: formik.values.chargeLevel,
      UNCode: formik.values.unCode,
      unknown,
    };
    let form_data = new FormData();

    Object.keys(obj).map((key) => {
      form_data.append(`model.${key}`, obj[key]);
      return form_data;
    });
    setButtonLoading(true);
    let result = await updateAssignment(form_data);
    if (result?.success) {
      setButtonLoading(false);
      setCheckChangesTrue();
      close();
      setSuccessModal(true);
      setResponseMessage("Bestellung erfolgreich aktualisiert");
    } else {
      setButtonLoading(false);
      setResponseMessage(result?.message);
      setErrorModal(true);
    }
    setButtonLoading(false);
  };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Das Netto Gewicht in kg bezieht sich auf das Batteriegewicht ohne
      Verpackungen.
    </Tooltip>
  );
  const clearImage = (e) => {
    file.current.value = "";
    setBatteryFile("");
    setBatteryImage("");
    if (batteryCondition === "542f61af-478c-48df-af9e-fbcb0337c155") {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  };
  const clearDocument = () => {
    document.current.value = "";
    setTransportFile("");
    setTransportImage({});
  };
  return (
    <div>
      <Modal
        show={show}
        centered
        size="xl"
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
        <div className="update-order-details custom-modal-body">
          <div className="details-card">
            <Formik
              initialValues={initialValues}
              validationSchema={validate}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {(formik) => (
                <Form onChange={handleOnChange}>
                  <Row>
                    <Col lg={7}>
                      <div className="properties px-3">
                        <h4>Produkteigenschaftenq</h4>
                        {[
                          {
                            name: "BMW/MINI/RR Teile-Nr.(AW):",
                            value: orderDetails.itemNumber
                              ? orderDetails.itemNumber
                              : "-",
                          },
                          {
                            name: "Batterie verbaut in:",
                            value: orderDetails.productUsed
                              ? orderDetails.productUsed
                              : "-",
                          },
                          {
                            name: "Kategorie:",
                            value: orderDetails.categoryName
                              ? orderDetails.categoryName
                              : "-",
                          },

                          {
                            name: "Zellchemie:",
                            value: orderDetails.cellChemistry
                              ? orderDetails.cellChemistry
                              : "-",
                          },
                          {
                            name: "Spannung [V]:",
                            value: orderDetails.voltageRange
                              ? orderDetails.voltageRange
                              : "-",
                          },
                          {
                            name: "Kapazitat [Ah]:",
                            value: orderDetails.capacity
                              ? orderDetails.capacity
                              : "-",
                          },
                          {
                            name: "Max.Leistung[KW]:",
                            value: orderDetails.maxPower
                              ? orderDetails.maxPower
                              : "-",
                          },

                          {
                            name: "Netto Gewicht [kg]:",
                            value: orderDetails.weight
                              ? orderDetails.weight
                              : "-",
                          },
                          {
                            name: "Maße Länge x Breite x Höhe [mm]:",
                            value: orderDetails.dimensions
                              ? orderDetails.dimensions
                              : "-",
                          },
                        ].map((item, index) => (
                          <Row key={index}>
                            <Col lg={5}>
                              {item.name === "Netto Gewicht [kg]:" ? (
                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderTooltip}
                                >
                                  <p>
                                    <b>{item.name}</b>
                                  </p>
                                </OverlayTrigger>
                              ) : (
                                <p>
                                  <b>{item.name}</b>
                                </p>
                              )}
                            </Col>
                            <Col lg={7}>
                              <p>
                                <span>
                                  {item?.name === "Sachnummer:"
                                    ? item?.value?.slice(0, 10)
                                    : item.value}
                                </span>
                              </p>
                            </Col>
                          </Row>
                        ))}
                      </div>
                    </Col>
                    <Col lg={5}>
                      <div className="battery-form">
                        <DropDown
                          label="Transportfähigkeitszustand*:"
                          list={dashboardData?.batteryCondition}
                          onChange={(e) => handleChange(e, "batteryCondition")}
                          value={batteryCondition}
                        />
                        <label>
                          Foto der Batterie
                          {batteryCondition ===
                          "542f61af-478c-48df-af9e-fbcb0337c155"
                            ? "*"
                            : ""}
                          :
                        </label>
                        <div className="search-field position-relative overflow-hidden d-inline-block">
                          <input
                            ref={file}
                            type="file"
                            placeholder="Search..."
                            className={`position-absolute opacity-0 top-0 start-0 `}
                            onChange={(e) => handleChange(e, "batteryFile")}
                            accept="image/x-png,image/jpeg"
                          />
                          <p className="mb-0">{batteryFile?.slice(0, 25)}</p>
                          {batteryFile ? (
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
                          ) : (
                            <img src="/assets/icons/upload.png" alt="upload" />
                          )}
                        </div>
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
                            onChange={(e) => handleChange(e, "unknown", formik)}
                            padding="0.75rem"
                          />
                          <p style={{ marginTop: "14px" }}>Unbekannt</p>
                        </div>
                        <DropDown
                          label="Verpackungsarten:"
                          list={selectivePackagingTypeList}
                          onChange={(e) => handleChange(e, "packagingType")}
                          value={packagingType}
                        />
                        {orderDetails?.categoryName ===
                          "Hochvoltspeicher Auto" && (
                          <>
                            <label>Transportfähigkeitsbescheinigung*:</label>
                            <div className="search-field position-relative overflow-hidden d-inline-block">
                              <input
                                ref={document}
                                type="file"
                                placeholder="Search..."
                                className={`position-absolute opacity-0 top-0 start-0 `}
                                onChange={(e) =>
                                  handleChange(e, "transport certificate")
                                }
                                accept="application/pdf"
                              />
                              <p className="mb-0">
                                {transportFile?.slice(0, 25)}
                              </p>
                              {transportFile?.length > 0 ? (
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
                                />
                              )}
                            </div>
                          </>
                        )}

                        {/* <label>Alternativer UN Code:</label> */}
                        {/* <div className="d-flex un-code">
                          <CheckBox
                            checked={enableUNCode}
                            onChange={(e) => handleChange(e, "enable-un")}
                            padding="0.75rem"
                          />
                          <TextField
                            type="text"
                            name="unCode"
                            width="calc(100% - 41.2px)"
                            padding="0.1rem 0.5rem"
                            disabled={!enableUNCode}
                            marginTop="-24px"
                          />
                        </div> */}
                      </div>
                    </Col>
                  </Row>
                  <div className="quantity d-flex align-items-center my-4">
                    <label className="me-3">Anzahl</label>
                    <div className="d-flex flex-wrap">
                      <div className="quantity-card d-flex">
                        <div
                          className="minus"
                          onClick={(e) => {
                            handleChange(e, minus);
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
                        >
                          <img src="/assets/icons/plus.png" alt="plus" />
                        </div>
                      </div>
                      {!buttonLoading ? (
                        <button
                          type="submit"
                          onClick={() => {
                            handleSubmit(formik);
                          }}
                        >
                          Hinzufügen
                        </button>
                      ) : (
                        <button type="submit" className="btn-disabled">
                          Hinzufügen
                        </button>
                      )}
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Modal>
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
  );
};
UpdateAssignementDetails.propTypes = {
  show: PropTypes.any,
  close: PropTypes.any,
  orderDetails: PropTypes.any,
  setCheckChangesTrue: PropTypes.any,
};
export default UpdateAssignementDetails;
