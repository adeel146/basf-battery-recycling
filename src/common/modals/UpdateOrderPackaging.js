import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Col, Row, Modal, Tooltip, OverlayTrigger } from "react-bootstrap";
import "./modals.scss";
import {
  minus,
  plus,
  _90362cfd_2867_4e31_98c9_957fe7f42f85,
} from "../constants/constants";
import { updateOrderPackaging } from "../services/OrderServices";
import ErrorMessage from "./ErrorMessage";
import PropTypes from "prop-types";
import SuccessMessage from "./SuccessMessage";
const UpdateOrderPackaging = (props) => {
  let { orderDetails, close, show, setCheckChangesTrue } = props;
  console.log(orderDetails, "orderDetails");
  const [count, setCount] = useState(1);
  const [unknown, setunknown] = useState(false);
  const [batteryFile, setBatteryFile] = useState("");
  const [initialValues, setInitialValues] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({});
  const [chargeLevel, setchargeLevel] = useState(0);
  const [errorModal, setErrorModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const validate = Yup.object({
    unCode: Yup.string(),
    chargeLevel: Yup.number()
      .min(0, "Must be 0 or greater")
      .max(100, "Must be 100 or less"),
  });

  const batteryConditionValidationLast = () => {
    let newValues = [];
    for (let i = 0; i < dashboardData?.cartPackagingType.length; i++) {
      const element = dashboardData?.cartPackagingType[i];
      if (element?.id === "90362cfd-2867-4e31-98c9-957fe7f42f85") {
        newValues.push(element);
      }
    }
  };

  const batteruConditionValidation = () => {
    if (
      orderDetails?.batteryConditionId ===
      "c842b716-8928-41a5-9873-e11dddc9fe63"
    ) {
      let newValues = [];
      for (let i = 0; i < dashboardData?.cartPackagingType.length; i++) {
        const element = dashboardData?.cartPackagingType[i];
        if (
          element?.id !== _90362cfd_2867_4e31_98c9_957fe7f42f85 &&
          element?.id !== "d5ff8d22-f49a-4b28-84a1-35d07cddab3f"
        ) {
          newValues.push(element);
        }
      }
    } else if (
      orderDetails?.batteryConditionId ===
      "b120e017-2b79-45ed-a3b5-b7bbbd83a351"
    ) {
      let newValues = [];
      for (let i = 0; i < dashboardData?.cartPackagingType.length; i++) {
        const element = dashboardData?.cartPackagingType[i];
        if (element?.id === "787d8c64-0dca-458c-92c1-a68602def701") {
          newValues.push(element);
        }
      }
    } else if (
      orderDetails?.batteryConditionId ===
      "542f61af-478c-48df-af9e-fbcb0337c155"
    ) {
      batteryConditionValidationLast();
    }
  };

  useEffect(() => {
    setCount(orderDetails?.quantity);
    setunknown(orderDetails?.unknown);
    setBatteryFile(orderDetails?.baterryImageName);
    setInitialValues({
      unCode: orderDetails?.unCode?.length > 0 ? orderDetails?.unCode : "",
      chargeLevel: orderDetails?.ladestand,
    });
    let dashboardData = JSON.parse(localStorage.getItem("dashboardData"));
    setDashboardData(dashboardData);
    batteruConditionValidation();

    if (chargeLevel < 0 || chargeLevel === "" || chargeLevel > 100) {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  }, [orderDetails]);

  const lastValidation = (value) => {
    let newValues = [];
    for (let i = 0; i < dashboardData?.cartPackagingType.length; i++) {
      const element = dashboardData?.cartPackagingType[i];
      if (element?.id === "90362cfd-2867-4e31-98c9-957fe7f42f85") {
        newValues.push(element);
      }
    }
    if (!batteryFile) {
      setButtonLoading(true);
    }
  };

  const batteryConditionCase = (value) => {
    if (value === "c842b716-8928-41a5-9873-e11dddc9fe63") {
      let newValues = [];
      for (let i = 0; i < dashboardData?.cartPackagingType.length; i++) {
        const element = dashboardData?.cartPackagingType[i];
        if (
          element?.id === "4bc0c1cf-dd80-42f5-ac5c-0dc9e5c4bc9e" ||
          element?.id === "787d8c64-0dca-458c-92c1-a68602def701"
        ) {
          newValues.push(element);
        }
      }
      setButtonLoading(false);
    } else if (value === "b120e017-2b79-45ed-a3b5-b7bbbd83a351") {
      let newValues = [];
      for (let i = 0; i < dashboardData?.cartPackagingType.length; i++) {
        const element = dashboardData?.cartPackagingType[i];
        if (element?.id === "d5ff8d22-f49a-4b28-84a1-35d07cddab3f") {
          newValues.push(element);
        }
      }
      setButtonLoading(false);
    } else if (value === "542f61af-478c-48df-af9e-fbcb0337c155") {
      lastValidation(value);
    }
  };

  const handleChange = (e, key, formik) => {
    console.log(formik, "formik");
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

        break;
      case "packagingType":
        break;
      case "batteryFile":
        console.log("running");
        file = e.target.files[0];
        setBatteryFile(file.name);
        setButtonLoading(false);
        break;
      case "transport certificate":
        file = e.target.files[0];
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (formik) => {
    let obj = {
      CartItemId: orderDetails.cartItemId,
      PackagingProductId: orderDetails.packagingProductId,
      Quantity: count,
    };
    let form_data = new FormData();
    Object.keys(obj).map((key) => {
      form_data.append(`model.${key}`, obj[key]);
      return form_data;
    });
    setButtonLoading(true);

    let result = await updateOrderPackaging(form_data);
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
  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "chargeLevel") {
      setchargeLevel(value);
    }
  };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Das Netto Gewicht in kg bezieht sich auf das Batteriegewicht ohne
      Verpackungen.
    </Tooltip>
  );
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
          <div
            className="details-card"
            style={{ border: "1px solid rgb(243, 149, 0);" }}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validate}
              enableReinitialize
            >
              {(formik) => (
                <Form onChange={handleOnChange}>
                  <h4>Produkteigenschaften</h4>
                  <Row>
                    <Col lg={8}>
                      <div className="properties px-3">
                        {[
                          {
                            name: "Name:",
                            value: orderDetails.category
                              ? orderDetails.category
                              : "-",
                          },
                          {
                            name: "Beschreibung:",
                            value: orderDetails.description
                              ? orderDetails.description
                              : "-",
                          },
                          {
                            name: "Maße Länge x Breite [mm]:",
                            value: orderDetails.dimensions
                              ? orderDetails.dimensions
                              : "-",
                          },
                          {
                            name: "Traglast [kg]:",
                            value: orderDetails.weight
                              ? orderDetails.weight
                              : "-",
                          },

                          {
                            name: "Preis:",
                            value: orderDetails.price
                              ? orderDetails.price
                              : "-",
                          },
                        ].map((item, index) => (
                          <Row key={index}>
                            <Col lg={4}>
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
                    {/* <Col lg={5}>
                    <div className="properties px-3">
                        {[
                          {
                            name: "BMW/MINI/RR Teile-Nr.(AW):",
                            value: orderDetails.itemNumber,
                          },
                          {
                            name: "Batterie verbaut in:",
                            value: orderDetails.productUsed,
                          },
                          {
                            name: "BMW/MINI/RR Teile-Nr.(AW):",
                            value: orderDetails.itemNumber,
                          },
                          {
                            name: "Batterie verbaut in:",
                            value: orderDetails.productUsed,
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
                            <Col lg={5}>
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
                    </Col> */}
                  </Row>
                  <div className="quantity d-flex align-items-center my-4">
                    <label className="me-3">Anzahl</label>
                    <div className="d-flex flex-wrap">
                      <div className="quantity-card-packaging d-flex">
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
                          className="button-packaging"
                          type="submit"
                          onClick={() => {
                            handleSubmit(formik);
                          }}
                        >
                          Hinzufügen
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn-disabled-packaging"
                        >
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
UpdateOrderPackaging.propTypes = {
  show: PropTypes.any,
  close: PropTypes.any,
  orderDetails: PropTypes.any,
  setCheckChangesTrue: PropTypes.any,
};
export default UpdateOrderPackaging;
