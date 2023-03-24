import React, { useState, useEffect } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import "./modals.scss";
import { updateCartItemDocuments } from "../services/AssignmentServices";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { delDocument } from "../services/OrderServices";
import { disabled_btn } from "../constants/constants";
import PropTypes from "prop-types";
import { userFileViewer } from "../services/CommonServices";

const ManageDocuments = (props) => {
  const {
    show,
    close,
    data,
    orderDetails,
    orderId,
    user,
    setCheckChangesTrue,
  } = props;
  const [delDocLoading, setdelDocLoading] = useState(false);
  const [recycleFile, setRecycleFile] = useState("");
  const [transportFile, setTransportFile] = useState("");
  const [reload, setreload] = useState(false);
  useEffect(() => {
    console.log("rerunning");
  }, [reload]);

  const handleSubmit = async (key, file) => {
    let obj = {
      OrderId: orderDetails?.orderId,
    };
    if (key === "recycle") {
      obj.AcceptanceSlipUrl = file;
    } else if (key === "transport") {
      obj.DeliveryNoteUrl = file;
    }
    let form_data = new FormData();

    Object.keys(obj).map((key) => {
      form_data.append(`model.${key}`, obj[key]);
      return form_data;
    });

    let result = await updateCartItemDocuments(form_data);
    if (result?.success) {
      toast.success("Dokument erfolgreich hochgeladen!");
      setCheckChangesTrue();
      setTimeout(() => {
        close();
      }, 2500);
    } else {
      toast.error(result?.message);
    }
  };

  const handleChooseFile = (e, key) => {
    let file;
    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    switch (key) {
      case "recycle":
        if (fileSize > 30) {
          toast.error("maximal 30mb erlaubt");
        } else {
          file = e.target.files[0];
          setRecycleFile(file.name);
          console.log(recycleFile);
          handleSubmit(key, file);
        }
        break;
      case "transport":
        if (fileSize > 30) {
          toast.error("maximal 30mb erlaubt");
        } else {
          file = e.target.files[0];
          setTransportFile(file.name);
          console.log(transportFile);
          handleSubmit(key, file);
        }
        break;
      default:
        break;
    }
  };
  const deleteDocument = async (props) => {
    setdelDocLoading(true);
    console.log(props);
    const result = await delDocument(props);
    if (result?.success) {
      setCheckChangesTrue();
      setreload(!reload);
      toast.success("Dokument erfolgreich gelöscht!");
      setTimeout(() => {
        close();
      }, 2500);
    } else {
      toast.error(result?.message);
    }
    setdelDocLoading(false);
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
      <div className="manage-docoments-modal custom-modal-body bg-white p-5">
        <h4>Dokumente verwalten</h4>
        <div className="d-flex mb-4 mt-3">
          <p className="mb-0">
            In dieser Übersicht können alle relevanten Dokumente <br />{" "}
            hochgeladen und eingesehen werden.
          </p>
        </div>
        <Row className="mb-2">
          <Col lg={3}>
            <p className="mt-2">
              <b>Lieferschein:</b>
            </p>
          </Col>

          <Col lg={9}>
            <Row>
              <Col lg={4} xs={6}>
                <div
                  className={
                    user === "dealer" ||
                    user === "management" ||
                    user === "oem" ||
                    data?.deliveryNoteName ||
                    orderDetails?.pickUpDateTarget == null
                      ? "position-relative overflow-hidden select-file disabled-btn"
                      : "position-relative overflow-hidden select-file"
                  }
                >
                  <button>
                    Hochladen
                    <img src="/assets/icons/upload.png" alt="download" />
                  </button>
                  <input
                    type="file"
                    className={`position-absolute opacity-0 top-0 start-0  `}
                    onChange={(e) => {
                      handleChooseFile(e, "transport");
                    }}
                    accept="application/pdf"
                  />
                </div>
              </Col>

              <Col lg={4} xs={6}>
                <button
                  className={`${!data?.deliveryNoteName && disabled_btn}`}
                >
                  <p
                    style={{
                      color: "initial",
                      cursor: "pointer",
                      margin: 0,
                      fontSize: "13px",
                    }}
                    onClick={async () => {
                      await userFileViewer(data?.deliveryNoteUrl);
                    }}
                  >
                    Anzeigen
                    <img
                      className="disabled-icon"
                      src="/assets/icons/file.png"
                      alt="download"
                    />
                  </p>
                </button>
              </Col>
              <Col lg={4}>
                {data?.deliveryNoteName && data?.hasDeletePermission && (
                  <FontAwesomeIcon
                    onClick={() =>
                      deleteDocument({
                        DeliveryNote: true,
                        AcceptanceSlip: false,
                        OrderId: orderId,
                      })
                    }
                    className={`${delDocLoading && disabled_btn}`}
                    style={{ color: "red", cursor: "pointer" }}
                    icon={faTrash}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col lg={3}>
            <p className="mt-1">
              <b>Übernahmeschein:</b>
            </p>
          </Col>

          <Col lg={9}>
            <Row>
              <Col lg={4} xs={6}>
                <div
                  className={`position-relative overflow-hidden select-file ${
                    (user === "dealer" ||
                      user === "management" ||
                      user === "oem" ||
                      data?.acceptanceSlipName ||
                      !data?.deliveryNoteUrl) &&
                    disabled_btn
                  }`}
                >
                  <button>
                    Hochladen
                    <img src="/assets/icons/upload.png" alt="download" />
                  </button>
                  <input
                    type="file"
                    className={`position-absolute opacity-0 top-0 start-0  `}
                    onChange={(e) => {
                      handleChooseFile(e, "recycle");
                    }}
                    accept="application/pdf"
                  />
                </div>
              </Col>
              <Col lg={4} xs={6}>
                <button
                  className={`${!data?.acceptanceSlipName && "disabled-btn"}`}
                >
                  <p
                    style={{
                      color: "initial",
                      cursor: "pointer",
                      margin: 0,
                      fontSize: "13px",
                    }}
                    onClick={async () => {
                      await userFileViewer(data?.acceptanceSlipUrl);
                    }}
                  >
                    Anzeigen
                    <img
                      className="disabled-icon"
                      src="/assets/icons/file.png"
                      alt="download"
                    />
                  </p>
                </button>
              </Col>
              <Col lg={4}>
                {data?.acceptanceSlipName && data?.hasDeletePermission && (
                  <FontAwesomeIcon
                    onClick={() =>
                      deleteDocument({
                        DeliveryNote: false,
                        AcceptanceSlip: true,
                        OrderId: orderId,
                      })
                    }
                    className={`${delDocLoading && "disabled-btn"}`}
                    style={{ color: "red", cursor: "pointer" }}
                    icon={faTrash}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Toaster />
    </Modal>
  );
};
ManageDocuments.propTypes = {
  show: PropTypes.any,
  close: PropTypes.any,
  data: PropTypes.any,
  orderDetails: PropTypes.any,
  setCheckChangesTrue: PropTypes.any,
  orderId: PropTypes.any,
  user: PropTypes.any,
};
export default ManageDocuments;
