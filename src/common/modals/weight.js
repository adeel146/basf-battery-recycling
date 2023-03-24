import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Row, Col, Modal } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import "./modals.scss";
import TextField from "../ui/TextField";
import { updateWeight } from "../services/AssignmentServices";
import PropTypes from "prop-types";

const Weight = (props) => {
  const { show, close, orderDetails, setCheckChangesTrue } = props;
  const [btn_loading, setbtn_loading] = useState(false);
  const [initialValues, setInitialValues] = useState("");

  useEffect(() => {
    setInitialValues(orderDetails?.weight);
  }, [orderDetails?.weight]);

  const validate = Yup.object({
    weight: Yup.number()
      .typeError("Gewicht muss eine Zahl sein")
      .min(0, "Gewicht muss positiv sein")
      .max(99999, "Das Gewicht muss weniger als 6-stellig sein")
      .required("Erforderlich"),
  });
  const handleSubmit = async (formik) => {
    if (!formik.errors.weight) {
      setbtn_loading(true);
      let weight = formik.values.weight;
      let result = await updateWeight({
        id: orderDetails?.orderId,
        weight: weight,
      });
      if (result?.success) {
        toast.success("Gewicht erfolgreich hinzugefügt");
        setCheckChangesTrue();
        close();
      } else {
        toast.error(result?.message);
      }
      setbtn_loading(false);
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
          onClick={() => {
            close();
            setInitialValues({});
          }}
          className="custom-cursor"
        />
      </div>
      <Formik
        initialValues={{
          weight: initialValues ? initialValues : "",
        }}
        validationSchema={validate}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => (
          <>
            <div className="actual-pickup-modal custom-modal-body bg-white p-5">
              <h4 onClick={() => console.log(formik, "formik")}>
                Tatsächliches Gewicht dieser Abholung{" "}
                {orderDetails?.weight ? "ändern" : "eintragen"}:
              </h4>

              <Row>
                <Col lg={6} className="mt-2">
                  <Form>
                    <div className="d-flex tatsch-section">
                      <div>
                        <TextField
                          type="number"
                          name="weight"
                          placeholder="Gewicht"
                          width="170px"
                          padding="0.375rem 0.3rem"
                          min={0}
                        />
                      </div>
                      <div
                        style={{ paddingTop: "2rem", fontWeight: "bold" }}
                        className="ms-1 "
                      >
                        <p>Kg</p>
                      </div>
                    </div>
                  </Form>
                </Col>
              </Row>
              {!btn_loading && formik.isValid && formik.values.weight !== "" ? (
                <button
                  type="submit"
                  className="submit-btn mt-4"
                  onClick={() => handleSubmit(formik)}
                >
                  {orderDetails?.weight ? "Speichern" : "Absenden"}
                </button>
              ) : (
                <button type="submit" className="submit-btn mt-4 btn-disabled">
                  {orderDetails?.weight ? "Speichern" : "Absenden"}
                </button>
              )}
            </div>
          </>
        )}
      </Formik>
      <Toaster />
    </Modal>
  );
};
Weight.propTypes = {
  show: PropTypes.any,
  close: PropTypes.any,
  orderDetails: PropTypes.any,
  setCheckChangesTrue: PropTypes.any,
};
export default Weight;
