import React, { useState, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import {
  createOrderPackaging,
  getOrdersListPackaging,
} from "../../../common/services/OrderServices";
import {
  getServiceType,
  getThemeContent,
} from "../../../common/utils/Utilities";
import BreadCrumb from "../../BreadCrumb";
import UpdateOrderDetailsCustom from "../../../common/modals/UpdateOrderDetailCustom";
import DeleteProductPackaging from "../../../common/modals/DeleteProductPackaging";
import UpdateOrderPackaging from "../../../common/modals/UpdateOrderPackaging";
import PropTypes from "prop-types";
const CartPackaging = (props) => {
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
  const [buttonLoading, setbuttonLoading] = useState(false);

  useEffect(() => {
    const getListing = async () => {
      setPageLoading(true);
      if (getServiceType() === "packaging") {
        let result = await getOrdersListPackaging();
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
    setUpdateOrderDetailsModal(true);
  };
  const { setScreen } = props;

  const breadcrumb = [
    { name: "Service Auswahl", activate: false, link: "/select-service" },
    { name: "Produktübersicht", activate: false, setScreen, value: 0 },
    { name: "Zusammenfassung", activate: true },
  ];
  const createOrder = async () => {
    setbuttonLoading(true);
    let result = await createOrderPackaging();
    if (result?.success) {
      history.push("assignments");
    } else {
      toast.error(result?.message);
    }
    setbuttonLoading(false);
  };
  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />

      <div className="my-page order-next-page">
        {!pageLoading ? (
          <>
            <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
              <h1>
                <b>Zusammenfassung </b>
              </h1>
              <div className="container-count">
                {/* <div className="container-count-inner">
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
                    <h2>{Weight}</h2>
                  </div>
                </div> */}
                {buttonLoading ? (
                  <button
                    className="order-next-page-btn m-0 btn-disabled-packaging"
                    style={{
                      backgroundColor: getThemeContent().color,
                      opacity:
                        ordersListResponse?.payLoad?.length === 0 && "0.6",
                      pointerEvents:
                        ordersListResponse?.payLoad?.length === 0 && "none",
                    }}
                  >
                    Kostenpflichtig bestellen
                  </button>
                ) : (
                  <button
                    className="order-next-page-btn m-0"
                    onClick={createOrder}
                    style={{
                      backgroundColor: getThemeContent().color,
                      opacity:
                        ordersListResponse?.payLoad?.length === 0 && "0.6",
                      pointerEvents:
                        ordersListResponse?.payLoad?.length === 0 && "none",
                    }}
                  >
                    Kostenpflichtig bestellen
                  </button>
                )}
              </div>
            </div>
            <div className="accordion-details-card">
              <Row>
                <Col lg={12}>
                  {ordersListResponse?.payLoad?.map((item, index) => (
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
                          borderBottom: `1px solid ${getThemeContent().color}`,
                          borderTop: `1px solid ${getThemeContent().color}`,
                        }}
                      >
                        <Row>
                          <Col xs={6} sm={6} md={6} lg={4}>
                            {[
                              {
                                name: "Name:",
                                value: item?.category,
                              },
                              {
                                name: "Beschreibung:",
                                value: item.description,
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
                                name: "Maße Länge x Breite [mm]:",
                                value: item.dimensions ? item.dimensions : "-",
                              },
                              {
                                name: "Traglast [kg]",
                                value: item.weight ? item.weight : "-",
                              },
                              {
                                name: "Preis:",
                                value: item.price ? item.price : "-",
                              },
                              {
                                name: "Anzahl:",
                                value: item.quantity ? item.quantity : "-",
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
                                style={{ color: "rgb(243, 149, 0)" }}
                              >
                                Löschen
                              </button>
                              <br />
                              <button
                                className="card-link"
                                onClick={(e) => {
                                  handleSubmit(e, "itemDetails", item);
                                }}
                                style={{ color: "rgb(243, 149, 0)" }}
                              >
                                Bearbeiten
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  ))}
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
        <UpdateOrderPackaging
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
        <DeleteProductPackaging
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
CartPackaging.propTypes = {
  setScreen: PropTypes.any,
};
export default CartPackaging;
