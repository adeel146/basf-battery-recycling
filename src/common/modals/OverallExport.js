import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Modal, Row } from "react-bootstrap";
import TextField from "../ui/TextField";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { exportOverallExcelFile } from "../services/AssignmentServices";
import PropTypes from "prop-types";

const OverallExport = ({ show, close }) => {
  const [btn_loading, setbtn_loading] = useState(false);
  const validate = Yup.object({
    dayTo: Yup.string().required("Erforderlich"),
    monthTo: Yup.string().required("Erforderlich"),
    yearTo: Yup.string().required("Erforderlich"),
    dayFrom: Yup.string().required("Erforderlich"),
    monthFrom: Yup.string().required("Erforderlich"),
    yearFrom: Yup.string().required("Erforderlich"),
  });
  const handleSubmit = async (formik) => {
    let dayTo = formik.values.dayTo;
    let monthTo = formik.values.monthTo;
    let yearTo = formik.values.yearTo;

    let dayFrom = formik.values.dayFrom;
    let monthFrom = formik.values.monthFrom;
    let yearFrom = formik.values.yearFrom;

    let currentYear = new Date().getFullYear();
    if (yearTo >= currentYear || yearFrom >= currentYear) {
      if (Number(dayTo) < 10) {
        dayTo = "0" + Number(dayTo);
      }
      if (Number(dayFrom) < 10) {
        dayFrom = "0" + Number(dayFrom);
      }
      if (Number(monthTo) < 10) {
        monthTo = "0" + Number(monthTo);
      }
      if (Number(monthFrom) < 10) {
        monthFrom = "0" + Number(monthFrom);
      }

      let obj = {
        toDate: yearFrom + "-" + monthFrom + "-" + dayFrom,
        fromDate: yearTo + "-" + monthTo + "-" + dayTo,
      };
      setbtn_loading(true);
      let result = await exportOverallExcelFile(obj, "overall", ".xlsx");
    } else {
      toast.error("Das Jahr muss größer oder gleich dem aktuellen Jahr sein.");
    }
    setbtn_loading(false);
  };

  return (
    <Modal
      contentClassName="custom-modal"
      backdropClassName="custom-backdrop"
      show={show}
      centered
      size="md"
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
          dayTo: "",
          monthTo: "",
          yearTo: "",
          dayFrom: "",
          monthFrom: "",
          yearFrom: "",
        }}
        validationSchema={validate}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => (
          <>
            <div className="actual-pickup-modal custom-modal-body bg-white p-5">
              <Form>
                <h4>Excel Export von</h4>
                <Row>
                  <div className="d-flex tatsch-section">
                    <div>
                      <TextField
                        type="number"
                        name="dayTo"
                        placeholder="Tag"
                        maxLength={2}
                        max={31}
                        min={1}
                        width="70px"
                        padding="0.375rem 0.3rem"
                        showLabel={"false"}
                      />
                    </div>
                    <div className="ms-1">
                      <TextField
                        type="number"
                        name="monthTo"
                        placeholder="Monat"
                        maxLength={2}
                        max={12}
                        min={1}
                        width="100px"
                        padding="0.375rem 0.3rem"
                        showLabel={"false"}
                      />
                    </div>
                    <div className="ms-1">
                      <TextField
                        type="number"
                        name="yearTo"
                        placeholder="Jahr"
                        maxLength={4}
                        min={2022}
                        width="110px"
                        padding="0.375rem 0.3rem"
                        showLabel={"false"}
                      />
                    </div>
                  </div>
                </Row>
                <h4 className="mt-4">bis</h4>
                <Row>
                  <div className="d-flex tatsch-section">
                    <div>
                      <TextField
                        type="number"
                        name="dayFrom"
                        placeholder="Tag"
                        maxLength={2}
                        max={31}
                        min={1}
                        width="70px"
                        padding="0.375rem 0.3rem"
                        showLabel={"false"}
                      />
                    </div>
                    <div className="ms-1">
                      <TextField
                        type="number"
                        name="monthFrom"
                        placeholder="Monat"
                        maxLength={2}
                        max={12}
                        min={1}
                        width="100px"
                        padding="0.375rem 0.3rem"
                        showLabel={"false"}
                      />
                    </div>
                    <div className="ms-1">
                      <TextField
                        type="number"
                        name="yearFrom"
                        placeholder="Jahr"
                        maxLength={4}
                        min={2022}
                        width="110px"
                        padding="0.375rem 0.3rem"
                        showLabel={"false"}
                      />
                    </div>
                  </div>
                </Row>
              </Form>
              {!btn_loading ? (
                <button
                  type="submit"
                  className="submit-btn mt-4"
                  onClick={() => handleSubmit(formik)}
                >
                  Absenden
                </button>
              ) : (
                <button type="submit" className="submit-btn mt-4 btn-disabled">
                  Absenden
                </button>
              )}
            </div>
          </>
        )}
      </Formik>
    </Modal>
  );
};
OverallExport.propTypes = {
  show: PropTypes.any,
  close: PropTypes.any,
};
export default OverallExport;
