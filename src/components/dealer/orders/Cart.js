import React, { useState, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import UpdateOrderDetails from "../../../common/modals/UpdateOrderDetails";
import DeleteProduct from "../../../common/modals/DeleteProduct";
import { getOrdersList } from "../../../common/services/OrderServices";
import {
  getServiceType,
  getThemeContent,
} from "../../../common/utils/Utilities";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import BreadCrumb from "../../BreadCrumb";
import UpdateOrderDetailsCustom from "../../../common/modals/UpdateOrderDetailCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { trackingView } from "../../../common/utils/PageDetails";
import {
  FotoderBatterie,
  Transportfähigkeitsbescheinigung,
  Transportfähigkeitszustand,
} from "../../../common/constants/constants";
import PropTypes from "prop-types";
import { userFileViewer } from "../../../common/services/CommonServices";

const Cart = (props) => {
  trackingView({ value: "/cart" });
  const history = useHistory();
  const [updateOrderDetailsModal, setUpdateOrderDetailsModal] = useState(false);
  const [updateOrderDetailsModalCustom, setUpdateOrderDetailsModalCustom] =
    useState(false);
  const [checkChanges, setCheckChanges] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [ordersListResponse, setOrdersListResponse] = useState({});
  const [orderDetailsResponse, setOrderDetailsResponse] = useState({});
  const [Weight, setWeight] = useState("");
  const [cartItemId, setCartItemId] = useState("");

  useEffect(() => {
    const getListing = async () => {
      setPageLoading(true);
      if (getServiceType() === "pickUp") {
        let result = await getOrdersList();
        if (result?.success) {
          setPageLoading(false);
          setCheckChanges(false);
          setOrdersListResponse(result);
          setWeight(result.payLoad.totalWeight);
        } else {
          setPageLoading(false);
          toast.error(result?.message);
        }
      } else {
        setPageLoading(false);
        let list = {
          payLoad: JSON.parse(localStorage.getItem("dummyCartItem")),
        };
        setOrdersListResponse(list);
      }
    };

    getListing();
  }, [checkChanges]);

  const handleSubmit = (e, type, item) => {
    setOrderDetailsResponse(item);
    item.isTemporary === true
      ? setUpdateOrderDetailsModalCustom(true)
      : setUpdateOrderDetailsModal(true);
  };
  const { next, setScreen } = props;
  const breadcrumb = [
    { name: "Service Auswahl", activate: false, link: "/select-service" },
    { name: "Produktübersicht", activate: false, setScreen, value: 0 },
    { name: "Zusammenfassung", activate: true },
  ];

  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />

      <div className="my-page order-next-page">
        {/* <button
          className="bck-btn"
          style={{
            backgroundColor: getThemeContent().color,
          }}
          onClick={previous}
        >
          Zurück zur Übersicht
        </button> */}
        {!pageLoading ? (
          <>
            <div className="main-heading d-flex justify-content-between align-items-center mt-4">
              <h1>
                <b>Zusammenfassung </b>
              </h1>
              <div className="container-count">
                <div className="container-count-inner">
                  <div className="text">
                    <p className="bold-text">
                      Gesamtes netto Gewicht dieser Abholung [kg]:
                    </p>
                    <p className="p">
                      Ab einem netto Gewicht von 200 kg ist die Abholung
                      kostenlos.
                    </p>
                  </div>
                  <div>
                    <h3 className="weight">{Weight}</h3>
                  </div>
                </div>
                <button
                  className="order-next-page-btn m-0 text-capitalize"
                  onClick={() => {
                    if (getServiceType() === "pickUp") {
                      next();
                    } else {
                      localStorage.removeItem("currentProductDetails");
                      localStorage.removeItem("dummyCartItem");
                      history.push("/assignments");
                    }
                  }}
                  style={{
                    backgroundColor: getThemeContent().color,
                    opacity:
                      ordersListResponse?.payLoad?.listingResponse?.length ===
                        0 && "0.6",
                    pointerEvents:
                      ordersListResponse?.payLoad?.listingResponse?.length ===
                        0 && "none",
                    height: "65px",
                    width: "200px",
                  }}
                >
                  Zum Checkout
                </button>
              </div>
            </div>
            <div className="accordion-details-card">
              <Row>
                <Col lg={12}>
                  {ordersListResponse?.payLoad?.listingResponse?.map(
                    (item, index) => (
                      <div key={index} className="left-side bg-white">
                        {/* <div
                      className="head"
                      style={{
                        backgroundColor: getThemeContent().color,
                        border: `1px solid ${getThemeContent().color}`,
                      }}
                    /> */}
                        <div
                          className="body"
                          style={{
                            borderLeft: `1px solid ${getThemeContent().color}`,
                            borderRight: `1px solid ${getThemeContent().color}`,
                            borderBottom: `1px solid ${
                              getThemeContent().color
                            }`,
                          }}
                        >
                          <Row>
                            <Col xs={6} sm={6} md={6} lg={4}>
                              {item.isTemporary && (
                                <div className="d-flex customflag">
                                  <div className="d-flex innerflag">
                                    <FontAwesomeIcon
                                      className="mr-2"
                                      icon={faInfoCircle}
                                      style={{ color: "black" }}
                                    />
                                    <p>Nicht kategorisierte Nummer</p>
                                  </div>
                                </div>
                              )}

                              {[
                                {
                                  name: "BMW/MINI/RR Teile-Nr. (AW):",
                                  value: item.itemNumber
                                    ? item.itemNumber
                                    : "-",
                                },
                                {
                                  name: "Batterie verbaut in:",
                                  value: item.productUsed
                                    ? item.productUsed
                                    : "-",
                                },
                                {
                                  name: "Kategorie:",
                                  value: item.categoryName
                                    ? item.categoryName
                                    : "-",
                                },

                                {
                                  name: "Zellchemie:",
                                  value: item.cellChemistry
                                    ? item.cellChemistry
                                    : "-",
                                },
                              ].map((item, index) => (
                                <Row key={index}>
                                  <Col lg={6}>
                                    <p className="mb-2">
                                      <b>{item.name}</b>
                                    </p>
                                  </Col>
                                  <Col lg={6}>
                                    <p className="mb-2">
                                      <span>
                                        {item?.name === "Sachnummer:"
                                          ? item?.value?.slice(0, 10)
                                          : item.value}
                                      </span>
                                    </p>
                                  </Col>
                                </Row>
                              ))}
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={4}>
                              {[
                                {
                                  name: "Spannung [V]:",
                                  value: item.voltageRange
                                    ? item.voltageRange
                                    : "-",
                                },
                                {
                                  name: "Kapazität [Ah]:",
                                  value: item.capacity ? item.capacity : "-",
                                },
                                {
                                  name: "Max. Leistung [kW]:",
                                  value: item.maxPower ? item.maxPower : "-",
                                },
                                {
                                  name: "Gewicht [kg]:",
                                  value: item.weight ? item.weight : "-",
                                },
                                {
                                  name: "Maße Länge x Breite x Höhe [mm]:",
                                  value: item.dimensions
                                    ? item.dimensions
                                    : "-",
                                },
                              ].map((item, index) => {
                                return (
                                  <Row key={index}>
                                    <Col lg={6}>
                                      <p className="mb-2">
                                        <b>{item.name}</b>
                                      </p>
                                    </Col>
                                    <Col lg={6}>
                                      <p className="mb-2">
                                        <span>
                                          {item?.name === "Sachnummer:"
                                            ? item?.value?.slice(0, 10)
                                            : item.value}
                                        </span>
                                      </p>
                                    </Col>
                                  </Row>
                                );
                              })}
                            </Col>

                            {getServiceType() === "pickUp" && (
                              <>
                                <Col xs={6} sm={12} md={6} lg={4}>
                                  {[
                                    {
                                      name: Transportfähigkeitszustand,
                                      value: item.baterryCondition
                                        ? item.baterryCondition
                                        : "-",
                                      code: item.baterryConditionColorCode,
                                    },
                                    {
                                      name: FotoderBatterie,
                                      value: item.baterryImageName
                                        ? item.baterryImageName
                                        : "-",
                                      code: item?.baterryImageUrl,
                                    },
                                    {
                                      name: "Ladezustand [%]:",
                                      value: item.unknown
                                        ? "unbekannt"
                                        : item.ladestand,
                                    },
                                    {
                                      name: Transportfähigkeitsbescheinigung,
                                      value:
                                        item.transportabilityCertificateName
                                          ? item.transportabilityCertificateName
                                          : "-",
                                      code: item.transportabilCertificateUrl,
                                    },
                                    {
                                      name: "Verpackungsart:",
                                      value: item.packagingType?.replace(
                                        " mit Innenkorb",
                                        ""
                                      ),
                                    },
                                    {
                                      name: "Anzahl:",
                                      value: item?.quantity,
                                    },
                                  ].map((el, index) => (
                                    <Row key={index}>
                                      <Col lg={7}>
                                        <p className="mb-2">
                                          <b>{el.name}</b>
                                        </p>
                                      </Col>
                                      <Col lg={5}>
                                        <p className="mb-0">
                                          {el?.name === FotoderBatterie ||
                                          el?.name ===
                                            Transportfähigkeitsbescheinigung ? (
                                            <OverlayTrigger
                                              placement="top"
                                              delay={{ show: 250, hide: 400 }}
                                              overlay={
                                                <Tooltip>
                                                  {el?.name ===
                                                    FotoderBatterie ||
                                                  el?.name ===
                                                    Transportfähigkeitsbescheinigung
                                                    ? el.value?.slice(0, 500)
                                                    : el.value}
                                                </Tooltip>
                                              }
                                            >
                                              <span>
                                                {el.code ? (
                                                  <p
                                                    className="m-0"
                                                    style={{
                                                      color: "initial",
                                                      cursor: "pointer",
                                                    }}
                                                    onClick={async () => {
                                                      await userFileViewer(
                                                        el?.code
                                                      );
                                                    }}
                                                  >
                                                    {el?.name ===
                                                      "Foto der Batterie:" ||
                                                    el?.name ===
                                                      "Transportfähigkeitsbescheinigung:"
                                                      ? el.value?.slice(0, 12)
                                                      : el.value}
                                                  </p>
                                                ) : (
                                                  "-"
                                                )}
                                              </span>
                                            </OverlayTrigger>
                                          ) : (
                                            <span
                                              className={`${
                                                el?.name ===
                                                  Transportfähigkeitszustand &&
                                                "color-span"
                                              }`}
                                              style={{
                                                backgroundColor:
                                                  el?.name ===
                                                    Transportfähigkeitszustand &&
                                                  el?.code,
                                                color:
                                                  el?.name ===
                                                    Transportfähigkeitszustand &&
                                                  "#fff",
                                              }}
                                            >
                                              {el.value}
                                            </span>
                                          )}
                                        </p>
                                      </Col>
                                    </Row>
                                  ))}
                                </Col>
                              </>
                            )}
                          </Row>
                          <Row>
                            <Col xs={12} className="d-flex btm__Btns">
                              <div>
                                <button
                                  onClick={() => {
                                    setDeleteProductModal(true);
                                    setCartItemId(item?.cartItemId);
                                  }}
                                  className="card-link"
                                >
                                  Löschen
                                </button>
                                <br />
                                <button
                                  className="card-link"
                                  onClick={(e) => {
                                    handleSubmit(e, "itemDetails", item);
                                  }}
                                >
                                  Bearbeiten
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    )
                  )}
                </Col>
              </Row>
            </div>
          </>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              height: "60vh",
            }}
          >
            <Spinner animation="border" size="md" />
          </div>
        )}
        <Toaster />
        <UpdateOrderDetails
          show={updateOrderDetailsModal}
          orderDetails={orderDetailsResponse}
          close={() => {
            setUpdateOrderDetailsModal(false);
          }}
          setCheckChangesTrue={() => {
            setCheckChanges(true);
          }}
        />
        <UpdateOrderDetailsCustom
          show={updateOrderDetailsModalCustom}
          orderDetails={orderDetailsResponse}
          close={() => {
            setUpdateOrderDetailsModalCustom(false);
          }}
          setCheckChangesTrue={() => {
            setCheckChanges(true);
          }}
        />
        <DeleteProduct
          show={deleteProductModal}
          close={() => {
            setDeleteProductModal(false);
          }}
          setCheckChangesTrue={() => {
            setCheckChanges(true);
          }}
          id={cartItemId}
        />
      </div>
    </>
  );
};
Cart.propTypes = {
  setScreen: PropTypes.any,
  next: PropTypes.any,
};
export default Cart;
