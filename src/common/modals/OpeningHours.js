import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Row, Col, Modal } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import "./modals.scss";
import PropTypes from "prop-types";

import { useRef } from "react";
import { addOrderPickUpDateTwo } from "../services/AssignmentServices";

const OpeningHours = (props) => {
  const week = useRef();
  const { show, close, data, orderDetails, setCheckChangesTrue } = props;

  const [initialValues, setInitialValues] = useState({});
  const [display, setdisplay] = useState("");
  useEffect(() => {
    let date = orderDetails?.pickUpDateTarget;


    setInitialValues(date);
  }, [orderDetails?.pickUpDateTarget]);
  let weekList = [];
  for (var i = 1; i < 53; i++) {
    let date= new Date()
    weekList.push(date.getFullYear()+"-W"+i);
  }
  console.log(weekList,'weekList')
  const validate = Yup.object({
    week: Yup.string().required("Erforderlich"),
  });
  const handleSubmit = async (formik) => {
    let result = await addOrderPickUpDateTwo({
      orderId: orderDetails?.orderId,
      pickUpDate: initialValues,
    });
    if (result?.success) {
      toast.success("Datum erfolgreich hinzugefügt");
      setCheckChangesTrue();
      close();
    } else {
      toast.error(result?.message);
    }
  };

  const getFacility = (key1) => {
    if (key1 === "1") {
      return "Keine";
    } else if (key1 === "2") {
      return "Gabelstapler";
    } else if (key1 === "3") {
      return "Laderampe";
    } else if (key1 === "4") {
      return "Gabelstapler & Laderampe";
    }
  };

  console.log(initialValues, "initialValues");
  return (
    <Modal
      contentClassName="custom-modal"
      backdropClassName="custom-backdrop"
      show={show}
      centered
      size="lg"
    >
      <div className="close-icon-div d-flex justify-content-end">
        <img
          src="/assets/icons/cross-icon.png"
          alt="cross-btn"
          onClick={close}
          className="custom-cursor"
        />
      </div>{" "}
      <Formik
        initialValues={{
          week: initialValues,
        }}
        validationSchema={validate}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => (
          <>
            <div className="working-hours-modal custom-modal-body bg-white p-5">
              <h4>Abholzeiten</h4>
              <div className="d-flex mb-4 mt-3">
                <p className="mb-0">
                  <b>Von: </b>
                  {data?.startOpeningHours}
                </p>
                <p className="mb-0 ms-5">
                  <b>Bis: </b>
                  {data?.endOpeningHours}
                </p>
              </div>
              <Row className="mb-3">
                <p className="mb-0">
                  <b>{"Firmen Name:"}</b> {data?.name}
                </p>
              </Row>
              <Row className="mt-2">
                <Col lg={3}>
                  {[
                    { name: "Straße:", desc: data?.address },
                    { name: "Postleitzahl:", desc: data?.postalCode },
                    { name: "Stadt:", desc: data?.city },
                  ].map((item, index) => (
                    <p className="mb-0" key={index}>
                      <b>{item.name}</b>{" "}
                      {item.name === "Straße:" || item.name === "Stadt:"
                        ? item.desc?.slice(0, 15)
                        : item.desc}
                    </p>
                  ))}
                </Col>
                <Col lg={1} />
                <Col lg={8}>
                  {[
                    { name: "E-Mail der Kontaktperson:", desc: data?.email },
                    { name: "Telefon der Kontaktperson:", desc: data?.phone },
                    {
                      name: "Telefon alternative Kontaktperson:",
                      desc: data?.phone,
                    },
                  ].map((item, index) => (
                    <p className="m-0" key={index}>
                      <b>{item.name}</b>{" "}
                      {item.name === "Telefon alternative Kontaktperson:" ||
                      item.name === "Telefon der Kontaktperson:"
                        ? item.desc?.slice(0, 35)
                        : item.desc}
                    </p>
                  ))}
                </Col>
              </Row>
              <Row className="mb-5">
                <Col lg={12}>
                  <p className="mb-0">
                    <b>Be- und Entladeeinrichtungen: &nbsp;</b>
                    {getFacility(data?.loadingFacility)}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col lg={6} className="mt-2">
                  <h5>Abholdatum</h5>

                  <Form>
                    <div className="d-flex tatsch-section">
                      <div>
                        {week?.current?.type === "text" && setdisplay("none")}
                        <input
                          name="week"
                          onChange={(e) => setInitialValues(e.target.value)}
                          value={initialValues}
                          style={{ display: `${display}`, padding: "6px" }}
                          ref={week}
                          type="week"
                        />
                        {display === "none" && (
                          <select
                            style={{
                              padding: "10px",
                              background: "white",
                              border: "1px solid black",
                            }}
                            name="cars"
                            id="cars"
                            onChange={(e) => setInitialValues(e.target.value)}
                            value={initialValues}
                          >
                            {weekList.map((item,index) => {
                              return (
                                <option key={index}  value={item}>{item}</option>
                              );
                            })}
                          </select>
                        )}
                      </div>
                    </div>
                  </Form>
                </Col>
              </Row>
              <button
                type="submit"
                className="submit-btn mt-4"
                onClick={() => handleSubmit(formik)}
              >
                Absenden
              </button>
            </div>
          </>
        )}
      </Formik>
      <Toaster />
    </Modal>
  );
};
OpeningHours.propTypes = {
  show: PropTypes.any,
  close: PropTypes.any,
  data: PropTypes.any,
  orderDetails: PropTypes.any,
  setCheckChangesTrue: PropTypes.any,
};
export default OpeningHours;
