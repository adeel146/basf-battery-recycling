import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Row, Col, Modal } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import "./modals.scss";
import TextField from "../ui/TextField";
import { updateReference } from "../services/AssignmentServices";
import PropTypes from "prop-types";

const Reference = (props) => {
  const { show, close, orderDetails, setCheckChangesTrue } = props;
  const [btn_loading, setbtn_loading] = useState(false);
  const [initialValues, setInitialValues] = useState("");

  useEffect(() => {
    setInitialValues(orderDetails?.reference);
  }, [orderDetails?.reference]);

  const validate = Yup.object({
    // day: Yup.number()
    //   .required("Erforderlich")
    //   .max(31, "Es wurde ein Datum ausgewählt, welches nicht existiert.”")
    //   .min(1, EswurdeeinDatumausgewähltwelchesnichtexistiert),
    // month: Yup.number()
    //   .required("Erforderlich")
    //   .max(12, EswurdeeinDatumausgewähltwelchesnichtexistiert)
    //   .min(1, EswurdeeinDatumausgewähltwelchesnichtexistiert),
    // year: Yup.number()
    //   .required("Erforderlich")
    //   .min(2022, EswurdeeinDatumausgewähltwelchesnichtexistiert),
    reference: Yup.string()
      .typeError("Referenz muss eine Zeichenfolge sein")
      .required("Erforderlich"),
  });
  const handleSubmit = async (formik) => {
    let reference = formik.values.reference;
    setbtn_loading(true);
    let result = await updateReference({
      id: orderDetails?.orderId,
      reference,
    });
    if (result?.success) {
      toast.success("Referenznummer erfolgreich hinzugefügt");
      setCheckChangesTrue();
      close();
    } else {
      toast.error(result?.message);
    }
    setbtn_loading(false);
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
            setInitialValues("");
          }}
          className="custom-cursor"
        />
      </div>
      <Formik
        initialValues={{
          reference: initialValues ? initialValues : "",
        }}
        validationSchema={validate}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => (
          <>
            <div className="actual-pickup-modal custom-modal-body bg-white p-5">
              <h4 onClick={() => console.log(formik, "formik")}>
                Referenznummer{" "}
                {orderDetails?.reference ? "ändern" : "eintragen"}:
              </h4>

              <Row>
                <Col lg={6} className="mt-2">
                  <Form>
                    <div className="d-flex tatsch-section">
                      <div>
                        <TextField
                          type="text"
                          name="reference"
                          width="170px"
                          padding="0.375rem 0.3rem"
                        />
                      </div>
                    </div>
                  </Form>
                </Col>
              </Row>
              {!btn_loading &&
              formik.isValid &&
              formik.values.reference !== "" ? (
                <button
                  type="submit"
                  className="submit-btn mt-4"
                  onClick={() => handleSubmit(formik)}
                >
                  {orderDetails?.reference ? "Speichern" : "Absenden"}
                </button>
              ) : (
                <button type="submit" className="submit-btn mt-4 btn-disabled">
                  {orderDetails?.reference ? "Speichern" : "Absenden"}
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
Reference.propTypes = {
  show: PropTypes.any,
  close: PropTypes.any,
  orderDetails: PropTypes.any,
  setCheckChangesTrue: PropTypes.any,
};
export default Reference;
