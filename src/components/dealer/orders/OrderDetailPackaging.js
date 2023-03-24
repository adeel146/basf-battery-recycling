import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Col, Row, Spinner } from "react-bootstrap";
import { minus, plus } from "../../../common/constants/constants";
import { addPackagingCart } from "../../../common/services/OrderServices";
import PropTypes from "prop-types";

import {
  getServiceType,
  getThemeContent,
} from "../../../common/utils/Utilities";
import ErrorMessage from "../../../common/modals/ErrorMessage";
import SuccessMessage from "../../../common/modals/SuccessMessage";

const OrderDetailPackaging = (props) => {
  const {
    detailsForm,
    detailsLoading,
    dashboardData,
    close,
    dummyCartItemLength,
  } = props;

  const [buttonLoading, setButtonLoading] = useState(true);
  const [unknown, setunknown] = useState(false);

  const [count, setCount] = useState(1);
  const [batteryCondition, setBatteryCondition] = useState("");
  const [batteryFile, setBatteryFile] = useState("");
  const [transportFile, setTransportFile] = useState("");
  const [packagingType, setPackagingType] = useState("");
  const [Category, setCategory] = useState("");
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
      (transportFile || Category !== "Hochvoltspeicher Auto") &&
      packagingType
    ) {
      setButtonLoading(false);
    } else if (transportFile && batteryCondition && dummyChargeLevel >= 0) {
      setButtonLoading(false);
    } else {
      setButtonLoading(true);
    }
    if (
      batteryCondition === "542f61af-478c-48df-af9e-fbcb0337c155" &&
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
    batteryCondition,
    batteryFile,
    transportFile,
    packagingType,
    dummyChargeLevel,
    Category,
  ]);

  const handeleDropdownChange = (value) => {
    let newValues = [];
    setBatteryCondition(value);
    for (let i = 0; i < dashboardData?.cartPackagingType.length; i++) {
      const element = dashboardData?.cartPackagingType[i];
      if (element?.id === "90362cfd-2867-4e31-98c9-957fe7f42f85") {
        newValues.push(element);
      }
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
    } else if (value === "b120e017-2b79-45ed-a3b5-b7bbbd83a351") {
      let newValues = [];
      setBatteryCondition(value);
      for (let i = 0; i < dashboardData?.cartPackagingType.length; i++) {
        const element = dashboardData?.cartPackagingType[i];
        if (element?.id === "d5ff8d22-f49a-4b28-84a1-35d07cddab3f") {
          newValues.push(element);
        }
      }
    } else if (value === "542f61af-478c-48df-af9e-fbcb0337c155") {
      handeleDropdownChange(value);
    }
  };
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
        break;
      case "packagingType":
        setPackagingType(value);
        break;
      case "batteryFile":
        file = e.target.files[0];
        setBatteryFile(file.name);
        break;
      case "transport certificate":
        file = e.target.files[0];
        setTransportFile(file.name);
        break;
      case "delFile":
        console.log(e.target.files, "e");
        file = e.target.files[0];
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (formik) => {
    if (getServiceType() === "packaging") {
      let product = JSON.parse(localStorage.getItem("currentProductDetails"));
      let payLoad = {
        packagingProductId: product?.orderingProductId,
        quantity: count,
      };
      let form_data = new FormData();
      Object.keys(payLoad).map((key) => {
        form_data.append(`model.${key}`, payLoad[key]);
        return form_data;
      });
      setButtonLoading(true);
      let result = await addPackagingCart(form_data);
      if (result?.success) {
        setSuccessModal(true);
        setResponseMessage(
          "Sie können weitere Produkte hinzufügen oder den Checkout vornehmen."
        );
        dummyCartItemLength();
        setTimeout(() => {
          close();
        }, 2500);
      } else {
        setResponseMessage(result?.message);
      }
      setButtonLoading(false);
    }
  };
  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "chargeLevel") {
      setDummyChargeLevel(value);
    }
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
          >
            {(formik) => (
              <Form onChange={handleOnChange}>
                <Row>
                  <div className="col-lg-12">
                    <h3>Produkteigenschaften</h3>
                    <Row>
                      <Col lg={9}>
                        <div className="properties ps-3">
                          {detailsForm.slice(0, 5).map((item, index) => (
                            <Row key={index}>
                              <Col lg={3}>
                                <p className="mb-2" key={item.id}>
                                  <b>{item.name}:</b>
                                </p>
                              </Col>
                              <Col lg={6}>
                                <p className="mb-2" key={item.id}>
                                  {item.value}
                                </p>
                              </Col>
                            </Row>
                          ))}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Row>
                <div className="quantity d-flex align-items-center mt-4">
                  <label className="me-3">Anzahl Verpackungen</label>
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
                        className="btn-disabled-packaging"
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
        ></div>
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
OrderDetailPackaging.propTypes = {
  detailsForm: PropTypes.any,
  detailsLoading: PropTypes.any,
  dashboardData: PropTypes.any,
  close: PropTypes.any,
  dummyCartItemLength: PropTypes.any,
};
export default OrderDetailPackaging;
