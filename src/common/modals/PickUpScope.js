import React, { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { updatePackagingList } from "../services/OrderServices";
import { Logistics_Role } from "../constants/constants";
import toast from "react-hot-toast";

const PickUpScope = (props) => {
  const { show, close, data, callBack } = props;
  const [dataArr, setdataArr] = useState(data);
  const [textMode, settextMode] = useState(false);

  const handleChange = (value, index, key) => {
    // if (value === "0") {
    //   let Arr = [...dataArr];
    //   Arr.splice(index, 1);
    //   setdataArr(Arr);
    // } else {
    //   let newArr = [...dataArr];
    //   newArr[index][key] = value;
    //   setdataArr(newArr);
    // }
    if (value < "0") {
      return;
    } else {
      let newArr = [...dataArr];
      newArr[index][key] = value;
      setdataArr(newArr);
    }
  };

  const handleSubmit = async () => {
    const result = await updatePackagingList(dataArr);
    if (result?.success) {
      toast.success("Erfolg");
      callBack();
      settextMode(!textMode);
      close();
    } else {
      toast.error(result?.message);
    }
  };
  return (
    <div>
      <Modal
        show={show}
        centered
        size="lg"
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
        <div className="pickup-scope custom-modal-body">
          <h4>
            <b>Umfang der gesamten Abholung</b>
          </h4>
          <p>
            In dieser Übersicht wir der gesamte Umfang der Abholung <br />
            für diese Bestellung gelistet.
          </p>
          {/* <Row>
            <Col lg={3}>
              <p>
                <b>Verpackung:</b>
              </p>
              {dataArr?.map((item, index) => (
                <p key={index}>{item?.packagingTypeName}</p>
              ))}
            </Col>
            <Col lg={3}>
              <p>
                <b>Anzahl:</b>
              </p>
              {dataArr?.map((item, index) =>
                textMode ? (
                  <p>
                    <input
                      onChange={(e) =>
                        handleChange(e.target.value, index, "count")
                      }
                      type="number"
                      className="input-update"
                      key={index}
                      value={item?.count}
                    />{" "}
                    Stk
                  </p>
                ) : (
                  <p key={index}>{item?.count} Stk</p>
                )
              )}
            </Col>
            <Col lg={6}>
              <p>
                <b>Gesamte Höher dieser Einheit in cm:</b>
              </p>
              {dataArr?.map((item, index) =>
                textMode ? (
                  <p>
                    <input
                      onChange={(e) =>
                        handleChange(e.target.value, index, "hieghtInCm")
                      }
                      className="input-update"
                      key={index}
                      value={item?.hieghtInCm}
                    />
                  </p>
                ) : (
                  <p key={index}>{item?.hieghtInCm}</p>
                )
              )}
            </Col>
          </Row> */}
          <Row>
            <Col lg={3}>
              {" "}
              <p>
                <b>Verpackung:</b>
              </p>
            </Col>
            <Col lg={3}>
              <p>
                <b>Anzahl:</b>
              </p>
            </Col>
            <Col lg={6}>
              <p>
                <b>Gesamte Höher dieser Einheit in cm:</b>
              </p>
            </Col>
          </Row>
          <Row>
            {" "}
            {dataArr?.map(
              (item, index) =>
                item?.count != "0" && (
                  <>
                    <Col lg={3}>
                      <p key={index}>{item?.packagingTypeName}</p>
                    </Col>
                    <Col lg={3}>
                      {textMode ? (
                        <p>
                          <input
                            onChange={(e) =>
                              handleChange(e.target.value, index, "count")
                            }
                            type="number"
                            className="input-update"
                            key={index}
                            value={item?.count}
                          />{" "}
                          Stk
                        </p>
                      ) : (
                        <p key={index}>{item?.count} Stk</p>
                      )}
                    </Col>
                    <Col lg={6}>
                      {textMode ? (
                        <p>
                          <input
                            type="number"
                            min="0"
                            name="heightIncm"
                            onChange={(e) =>
                              handleChange(e.target.value, index, "hieghtInCm")
                            }
                            className="input-update"
                            key={index}
                            value={item?.hieghtInCm}
                          />
                        </p>
                      ) : (
                        <p key={index}>{item?.hieghtInCm}</p>
                      )}
                    </Col>
                  </>
                )
            )}
          </Row>
          <Row>
            <Col lg={10}></Col>
            <Col lg={2}>
              {localStorage.getItem("role") !== Logistics_Role &&
                (textMode ? (
                  <p
                    onClick={handleSubmit}
                    role="button"
                    className="mb-0 me-2 text-decoration-underline"
                  >
                    Speichern
                  </p>
                ) : (
                  <p
                    onClick={() => settextMode(!textMode)}
                    role="button"
                    className="mb-0 me-2 text-decoration-underline"
                  >
                    Bearbeiten
                  </p>
                ))}
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};
PickUpScope.propTypes = {
  show: PropTypes.any,
  close: PropTypes.any,
  data: PropTypes.any,
};
export default PickUpScope;
