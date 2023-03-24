import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Row, Col, Modal } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import "./modals.scss";
import PropTypes from "prop-types";
import TextField from "../ui/TextField";
import { addOrderPickUpDateOne } from "../services/AssignmentServices";
import { EswurdeeinDatumausgewähltwelchesnichtexistiert } from "../constants/constants";
const ActualPickup = (props) => {
  const { show, close, orderDetails, setCheckChangesTrue } = props;

  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    let date = orderDetails?.pickUpDateIs;

    date = date?.slice(0, 10);
    date = date?.split("-");
    let obj = {
      day: date && date[1],
      month: date && date[0],
      year: date && date[2],
    };
    setInitialValues(obj);
  }, [orderDetails?.pickUpDateIs]);

  const validate = Yup.object({
    day: Yup.number()
      .required("Erforderlich")
      .max(31, EswurdeeinDatumausgewähltwelchesnichtexistiert)
      .min(1, EswurdeeinDatumausgewähltwelchesnichtexistiert),
    month: Yup.number()
      .required("Erforderlich")
      .max(12, EswurdeeinDatumausgewähltwelchesnichtexistiert)
      .min(1, EswurdeeinDatumausgewähltwelchesnichtexistiert),
    year: Yup.number()
      .required("Erforderlich")
      .min(2022, EswurdeeinDatumausgewähltwelchesnichtexistiert),
  });
  const handleSubmit = async (formik) => {
    let day = formik.values.day;
    let month = formik.values.month;
    let year = formik.values.year;
    let currentYear = new Date().getFullYear();
    if (year >= currentYear) {
      if (Number(day) < 10) {
        day = "0" + Number(day);
      }
      if (Number(month) < 10) {
        month = "0" + Number(month);
      }

      let date = month + "-" + day + "-" + year;

      let result = await addOrderPickUpDateOne({
        orderId: orderDetails?.orderId,
        pickUpDate: date,
      });
      if (result?.success) {
        toast.success("Datum erfolgreich hinzugefügt");
        setCheckChangesTrue();
        close();
      } else {
        toast.error(result?.message);
      }
    } else {
      toast.error("Das Jahr muss größer oder gleich dem aktuellen Jahr sein.");
    }
  };
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
      </div>
      <Formik
        initialValues={{
          day: initialValues.day,
          month: initialValues.month,
          year: initialValues.year,
        }}
        validationSchema={validate}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => (
          <>
            <div className="actual-pickup-modal custom-modal-body bg-white p-5">
              <h4>Tatsächliche Abholung</h4>

              <Row>
                <Col lg={6} className="mt-2">
                  <Form>
                    <div className="d-flex tatsch-section">
                      <div>
                        <TextField
                          type="number"
                          name="day"
                          placeholder="Tag"
                          maxLength={2}
                          max={31}
                          min={1}
                          width="70px"
                          padding="0.375rem 0.3rem"
                        />
                      </div>
                      <div className="ms-1">
                        <TextField
                          type="number"
                          name="month"
                          placeholder="Monat"
                          maxLength={2}
                          max={12}
                          min={1}
                          width="100px"
                          padding="0.375rem 0.3rem"
                        />
                      </div>
                      <div className="ms-1">
                        <TextField
                          type="number"
                          name="year"
                          placeholder="Jahr"
                          maxLength={4}
                          min={2022}
                          width="110px"
                          padding="0.375rem 0.3rem"
                        />
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
ActualPickup.propTypes = {
  show: PropTypes.any,
  close: PropTypes.any,
  orderDetails: PropTypes.any,
  setCheckChangesTrue: PropTypes.any,
};
export default ActualPickup;
