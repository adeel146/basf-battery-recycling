import React, { useEffect, useState } from "react";
import { Accordion, Col, Row, Table, Spinner } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import {
  FotoderBatterie,
  minus,
  orderType,
  pageSize,
  plus,
  Transportfähigkeitsbescheinigung,
  Transportfähigkeitszustand,
} from "../../../common/constants/constants";
import ManageDocuments from "../../../common/modals/ManageDocuments";
import PickUpScope from "../../../common/modals/PickUpScope";
import ReplacementPackaging from "../../../common/modals/ReplacementPackaging";
import UpdateOrderDetails from "../../../common/modals/UpdateAssignementDetails";
import {
  getEntirePickUpScopeInfo,
  getReplacementPackagingInfo,
  getCartItemDocuments,
  getOrdersList,
} from "../../../common/services/AssignmentServices";
import FilterCard from "../../../common/ui/FilterCard";
import ProgressSteps from "../../../common/ui/ProgressSteps";
import {
  GermanDateFormat,
  getServiceType,
  getThemeContent,
} from "../../../common/utils/Utilities";

import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import DeleteAssignment from "../../../common/modals/DeleteAssignment";
import BreadCrumb from "../../../components/BreadCrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import UpdateOrderDetailsCustom from "../../../common/modals/UpdateOrderDetailCustom";
import { userFileViewer } from "../../../common/services/CommonServices";

const OrderAssignments = () => {
  let dashboardData = JSON.parse(localStorage.getItem("dashboardData"));
  const [count, setCount] = useState([]);
  const [ordersListResponse, setOrdersListResponse] = useState({});
  const [entirePickUpResponse, setEntirePickUpResponse] = useState([]);
  const [itemDocumentsResponse, setItemDocumentsResponse] = useState({});
  const [replacementPackagingResponse, setReplacementPackagingResponse] =
    useState([]);
  const [orderDetailsResponse, setOrderDetailsResponse] = useState({});
  const [updateOrderDetailsModal, setUpdateOrderDetailsModal] = useState(false);
  const [updateOrderDetailsModalCustom, setUpdateOrderDetailsModalCustom] =
    useState(false);
  const [manageDocumentModal, setManageDocumentModal] = useState(false);
  const [pickUpScopeModal, setPickUpScopeModal] = useState(false);
  const [replacementPackagingModal, setReplacementPackagingModal] =
    useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [checkChanges, setCheckChanges] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [cartItemId, setCartItemId] = useState("");
  const [searchonClick, setsearchonClick] = useState(false);

  const handelSearchonClick = () => {
    setsearchonClick(!searchonClick);
  };
  const getListing = async (params) => {
    setPageLoading(true);
    let result = await getOrdersList(params);
    if (result?.success) {
      setPageLoading(false);
      setOrdersListResponse(result?.payLoad);
    } else {
      setPageLoading(false);
      toast.error(result?.message);
    }
  };

  useEffect(() => {
    let params = {
      pageNumber,
      pageSize: pageSize,
      key: searchInput,
      orderBy: selectValue,
      orderType: orderType,
    };

    getListing(params);
  }, [pageNumber, searchonClick, selectValue, checkChanges]);

  const handleNextPage = async (page) => {
    let pageNumber = page.selected + 1;
    setPageNumber(pageNumber);
  };

  const handleChange = (e, key, index) => {
    let item;
    let value;
    if (key === minus || key === plus) {
      item = +count[index];
    } else {
      value = e.target.value;
    }
    if (key === minus) {
      e.stopPropagation();
      if (item > 1) {
        item = item - 1;
        count[index] = item;
        setCount([...count]);
      }
    } else if (key === plus) {
      e.stopPropagation();
      item = +item + 1;
      count[index] = +item;
      setCount([...count]);
    } else if (key === "selectValue") {
      setSelectValue(value);
    } else if (key === "searchInput") {
      setSearchInput(value);
      setPageNumber(1);
    }
  };
  const handleSubmit = async (e, key, item) => {
    if (key === "itemDocuments") {
      e.stopPropagation();
      let result = await getCartItemDocuments(item?.orderId);
      if (result?.success) {
        setItemDocumentsResponse(result);
        setManageDocumentModal(true);
      } else {
        toast.error(result?.message);
      }
    } else if (key === "replacePackage") {
      e.stopPropagation();
      let result = await getReplacementPackagingInfo(item?.orderId);
      if (result?.success) {
        setReplacementPackagingResponse([...result?.payLoad]);
        setReplacementPackagingModal(true);
      } else {
        toast.error(result?.message);
      }
    } else if (key === "pickUpScope") {
      e.stopPropagation();
      let result = await getEntirePickUpScopeInfo(item?.orderId);
      if (result?.success) {
        setEntirePickUpResponse([...result?.payLoad]);
        setPickUpScopeModal(true);
      } else {
        toast.error(result?.message);
      }
    } else if (key === "itemDetails") {
      item.isTemporary
        ? setUpdateOrderDetailsModalCustom(true)
        : setUpdateOrderDetailsModal(true);
    }
    setOrderDetailsResponse(item);
  };

  const handleItemDetails = (item) => {
    let array = [];
    for (let i = 0; i < item.length; i++) {
      let element = item[i];
      array.push(+element?.quantity);
    }
    setCount([...array]);
  };
  const breadcrumb = [
    { name: "Service Auswahl", activate: false, link: "/select-service" },
    { name: "Aufträge", activate: true },
  ];
  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />

      <div className="my-page assignment-page dealer-page">
        {/* <button
          className="bck-btn mb-5"
          onClick={() => {
            window.location = "/select-service";
          }}
          style={{
            backgroundColor: getThemeContent().color,
          }}
        >
          <img src="/assets/icons/login-arrow.png" alt="bck" />
          Service auswählen
        </button> */}

        {!pageLoading ? (
          <>
            <h1>
              <b>Aufträge Batterieabholung</b>
            </h1>
            <FilterCard
              handleChange={(e) => handleChange(e, "selectValue")}
              handleSearch={(e) => handleChange(e, "searchInput")}
              handelSearchonClick={handelSearchonClick}
              value={searchInput}
              dropdownValue={selectValue}
              list={dashboardData?.orderOrderByProperties}
            />

            <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
              <p className="m-0 custom-font-size">
                {/* Showing{" "}
              <b>
                {ordersListResponse?.items?.length} of{" "}
                {ordersListResponse?.totalCount}
              </b>{" "}
              Records */}
              </p>
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={ordersListResponse?.totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handleNextPage}
                containerClassName={`pagination ${
                  getServiceType() === "pickUp"
                    ? "pagination-blue"
                    : "pagination-orange"
                }`}
                activeClassName={"active"}
                activeLinkClassName={"active-link"}
                forcePage={pageNumber - 1}
              />
            </div>

            <Table
              responsive
              borderless
              className={`table-data my-custom-table mt-3  ${
                getServiceType() === "pickUp"
                  ? "table-data-blue"
                  : "table-data-orange"
              }`}
            >
              <thead
                className="custom-table-head"
                style={{
                  backgroundColor: getThemeContent().color,
                }}
              >
                <tr>
                  {getServiceType() === "pickUp" ? (
                    <>
                      <th>Auftragsnummer</th>
                      <th>Erstellungsdatum</th>
                      <th>Freigabedatum</th>
                      <th>Abholdatum Soll</th>
                      <th>Abholdatum Ist</th>
                      <th>Austausch</th>
                      <th>Dokumente</th>
                      <th>Verpackung</th>
                    </>
                  ) : (
                    <>
                      <th>Auftragsnummer</th>
                      <th>Bestelldatum</th>
                      <th>Lieferdatum</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className={`custom-table-body`}>
                <tr>
                  <td colSpan={8} className="main-td">
                    <Accordion defaultActiveKey="-111">
                      {ordersListResponse?.items?.map((itemMain, index) => (
                        <Accordion.Item
                          key={index}
                          eventKey={index}
                          onClick={() =>
                            handleItemDetails(itemMain?.orderDetail?.orderItem)
                          }
                        >
                          <Accordion.Header>
                            <Table borderless className="w-100 m-0">
                              <tbody>
                                <tr>
                                  {getServiceType() === "pickUp" ? (
                                    <>
                                      <OverlayTrigger
                                        placement="top"
                                        // delay={{ hide: 400 }}
                                        overlay={
                                          <Tooltip id={index}>
                                            {"Klicken Sie zum Kopieren"}
                                          </Tooltip>
                                        }
                                      >
                                        <td
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            navigator.clipboard.writeText(
                                              itemMain?.orderCode
                                            );
                                            toast.success(
                                              "Die Auftragsnummer wurde in den Zwischenspeicher kopiert."
                                            );
                                          }}
                                        >
                                          {itemMain?.orderCode}
                                        </td>
                                      </OverlayTrigger>
                                      <td>
                                        {GermanDateFormat(itemMain?.createdAt)}
                                      </td>
                                      <td>
                                        {itemMain?.releaseDate.includes("0001")
                                          ? "N/A"
                                          : GermanDateFormat(
                                              itemMain?.releaseDate
                                            )}
                                      </td>
                                      <td>
                                        {itemMain?.pickUpDateTarget == null
                                          ? "N/A"
                                          : itemMain?.pickUpDateTarget?.slice(
                                              0,
                                              10
                                            )}
                                      </td>
                                      <td>
                                        {itemMain?.pickUpDateIs == null
                                          ? "N/A"
                                          : itemMain?.pickUpDateIs?.slice(
                                              3,
                                              5
                                            ) +
                                            "/" +
                                            itemMain?.pickUpDateIs?.slice(
                                              0,
                                              2
                                            ) +
                                            "/" +
                                            itemMain?.pickUpDateIs?.slice(
                                              6,
                                              10
                                            )}
                                      </td>
                                      {itemMain?.exchange ? (
                                        <td>
                                          <span
                                            className="text-decoration-underline"
                                            onClick={(e) =>
                                              handleSubmit(
                                                e,
                                                "replacePackage",
                                                itemMain
                                              )
                                            }
                                          >
                                            Ja
                                          </span>
                                        </td>
                                      ) : (
                                        <td>Nein</td>
                                      )}
                                      <td>
                                        <img
                                          src="/assets/icons/file.png"
                                          alt="icon"
                                          onClick={(e) =>
                                            handleSubmit(
                                              e,
                                              "itemDocuments",
                                              itemMain
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <img
                                          src="/assets/icons/package.png"
                                          alt="icon"
                                          onClick={(e) =>
                                            handleSubmit(
                                              e,
                                              "pickUpScope",
                                              itemMain
                                            )
                                          }
                                          style={{
                                            width: "20px",
                                          }}
                                        />
                                      </td>
                                    </>
                                  ) : (
                                    <>
                                      <td>{itemMain?.orderCode}</td>
                                      <td>
                                        {itemMain?.createdAt?.slice(0, 10)}
                                      </td>
                                      <td>
                                        {itemMain?.releaseDate?.slice(0, 10)}
                                      </td>
                                    </>
                                  )}
                                </tr>
                              </tbody>
                            </Table>
                          </Accordion.Header>
                          <Accordion.Body>
                            <>
                              <div className="accordion-details-card">
                                <ProgressSteps
                                  active={itemMain?.orderDetail?.orderStatus}
                                />
                                <Row>
                                  <Col lg={12}>
                                    {itemMain?.orderDetail?.orderItem?.map(
                                      (item, index) => (
                                        <div
                                          key={index}
                                          className="left-side bg-white"
                                        >
                                          {/* <div
                                          className="head"
                                          style={{
                                            backgroundColor:
                                              getThemeContent().color,
                                            border: `1px solid ${
                                              getThemeContent().color
                                            }`,
                                          }}
                                        /> */}
                                          <div
                                            className="body"
                                            style={{
                                              borderLeft: `1px solid ${
                                                getThemeContent().color
                                              }`,
                                              borderRight: `1px solid ${
                                                getThemeContent().color
                                              }`,
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
                                                        style={{
                                                          color: "black",
                                                        }}
                                                      />
                                                      <p>
                                                        Nicht kategorisierte
                                                        Nummer
                                                      </p>
                                                    </div>
                                                  </div>
                                                )}
                                                {[
                                                  {
                                                    name: "BMW/MINI/RR Teile-Nr.(AW):",
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
                                                          {item?.name ===
                                                          "Sachnummer:"
                                                            ? item?.value?.slice(
                                                                0,
                                                                10
                                                              )
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
                                                    name: "Kapazitat [Ah]:",
                                                    value: item.capacity
                                                      ? item.capacity
                                                      : "-",
                                                  },
                                                  {
                                                    name: "Max.Leistung [KW]:",
                                                    value: item.maxPower
                                                      ? item.maxPower
                                                      : "-",
                                                  },
                                                  {
                                                    name: "Gewicht [kg]:",
                                                    value: item.weight
                                                      ? item.weight
                                                      : "-",
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
                                                            {item?.name ===
                                                            "Sachnummer:"
                                                              ? item?.value?.slice(
                                                                  0,
                                                                  10
                                                                )
                                                              : item.value}
                                                          </span>
                                                        </p>
                                                      </Col>
                                                    </Row>
                                                  );
                                                })}
                                              </Col>

                                              <Col xs={6} sm={12} md={6} lg={4}>
                                                {[
                                                  {
                                                    name: Transportfähigkeitszustand,
                                                    value:
                                                      item?.batteryConditionName
                                                        ? item?.batteryConditionName
                                                        : "-",
                                                    code: item?.batteryConditionColorCode,
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
                                                    name: "Verpackungsart:",
                                                    value:
                                                      item.packagingTypeName?.replace(
                                                        " mit Innenkorb",
                                                        ""
                                                      ),
                                                  },
                                                  {
                                                    name: Transportfähigkeitsbescheinigung,
                                                    value:
                                                      item?.transportabilityCertificateName
                                                        ? item?.transportabilityCertificateName
                                                        : "-",
                                                    code: item?.transportabilCertificateUrl,
                                                  },

                                                  {
                                                    name: "Anzahl:",
                                                    value: count[index],
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
                                                        {el?.name ===
                                                          FotoderBatterie ||
                                                        el?.name ===
                                                          Transportfähigkeitsbescheinigung ? (
                                                          <OverlayTrigger
                                                            placement="top"
                                                            delay={{
                                                              show: 250,
                                                              hide: 400,
                                                            }}
                                                            overlay={
                                                              <Tooltip>
                                                                {el?.name ===
                                                                  "Foto der Batterie:" ||
                                                                el?.name ===
                                                                  "Transportfähigkeitsbescheinigung:"
                                                                  ? el.value?.slice(
                                                                      0,
                                                                      500
                                                                    )
                                                                  : el.value}
                                                              </Tooltip>
                                                            }
                                                          >
                                                            <span className="color-span">
                                                              {el?.code ? (
                                                                <p
                                                                  className="m-0"
                                                                  style={{
                                                                    color:
                                                                      "initial",
                                                                    cursor:
                                                                      "pointer",
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
                                                                    ? el.value?.slice(
                                                                        0,
                                                                        15
                                                                      )
                                                                    : el.value}
                                                                </p>
                                                              ) : (
                                                                "-"
                                                              )}
                                                            </span>
                                                          </OverlayTrigger>
                                                        ) : (
                                                          <span
                                                            className="color-span"
                                                            style={{
                                                              backgroundColor:
                                                                el?.name ===
                                                                  "Transportfähigkeitszustand:" &&
                                                                el?.code,
                                                              color:
                                                                el?.name ===
                                                                  "Transportfähigkeitszustand:" &&
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
                                            </Row>
                                            <Row>
                                              <Col
                                                xs={12}
                                                className="d-flex btm__Btns"
                                              >
                                                {getServiceType() ===
                                                "pickUp" ? (
                                                  <>
                                                    <div>
                                                      {itemMain?.orderDetail
                                                        ?.orderStatus === 1 ? (
                                                        <>
                                                          <button
                                                            onClick={() => {
                                                              setDeleteProductModal(
                                                                true
                                                              );
                                                              setCartItemId(
                                                                item?.orderItemId
                                                              );
                                                            }}
                                                            className="card-link"
                                                          >
                                                            Löschen
                                                          </button>
                                                          <br />
                                                          <button
                                                            className="card-link"
                                                            onClick={(e) => {
                                                              handleSubmit(
                                                                e,
                                                                "itemDetails",
                                                                item
                                                              );
                                                            }}
                                                          >
                                                            Bearbeiten
                                                          </button>
                                                        </>
                                                      ) : (
                                                        <>
                                                          <button
                                                            className="card-link"
                                                            style={{
                                                              opacity: "0.7",
                                                            }}
                                                          >
                                                            Löschen
                                                          </button>
                                                          <br />

                                                          <button
                                                            className="card-link"
                                                            style={{
                                                              opacity: "0.7",
                                                            }}
                                                          >
                                                            Bearbeiten
                                                          </button>
                                                        </>
                                                      )}
                                                    </div>
                                                  </>
                                                ) : (
                                                  <>
                                                    <div className="disabled">
                                                      <button
                                                        disabled
                                                        className="card-link disabled"
                                                      >
                                                        Löschen
                                                      </button>
                                                      <br />
                                                      <button
                                                        disabled
                                                        className="card-link disabled"
                                                      >
                                                        Bearbeiten
                                                      </button>
                                                    </div>
                                                  </>
                                                )}
                                              </Col>
                                            </Row>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col style={{ marginTop: "15px" }} md={7}>
                                    {" "}
                                    <div>
                                      <b>Kommentar / Notiz:</b>
                                      <textarea
                                        disabled
                                        value={itemMain.comments}
                                        className="text-area"
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            </>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </td>
                </tr>
              </tbody>
            </Table>
          </>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              height: "60vh",
            }}
          >
            <Spinner animation="border" />
          </div>
        )}
        <Toaster />
        <UpdateOrderDetails
          show={updateOrderDetailsModal}
          hideModal={() => {
            setUpdateOrderDetailsModal(false);
          }}
          close={() => {
            setUpdateOrderDetailsModal(false);
          }}
          orderDetails={orderDetailsResponse}
          setCheckChangesTrue={() => {
            setCheckChanges(!checkChanges);
          }}
        />
        <UpdateOrderDetailsCustom
          show={updateOrderDetailsModalCustom}
          hideModal={() => {
            setUpdateOrderDetailsModalCustom(false);
          }}
          close={() => {
            setUpdateOrderDetailsModalCustom(false);
          }}
          orderDetails={orderDetailsResponse}
          setCheckChangesTrue={() => {
            setCheckChanges(!checkChanges);
          }}
        />
        <ReplacementPackaging
          show={replacementPackagingModal}
          close={() => {
            setReplacementPackagingModal(false);
          }}
          data={replacementPackagingResponse}
        />
        <ManageDocuments
          show={manageDocumentModal}
          close={() => {
            setManageDocumentModal(false);
          }}
          data={itemDocumentsResponse.payLoad}
          orderId={orderDetailsResponse?.orderId}
          orderDetails={orderDetailsResponse}
          user="dealer"
          setCheckChangesTrue={() => {
            setCheckChanges(!checkChanges);
          }}
        />
        {pickUpScopeModal && (
          <PickUpScope
            show={pickUpScopeModal}
            close={() => {
              setPickUpScopeModal(false);
            }}
            data={entirePickUpResponse}
            callBack={() => setCheckChanges(!checkChanges)}
          />
        )}
        <DeleteAssignment
          show={deleteProductModal}
          close={() => {
            setDeleteProductModal(false);
          }}
          setCheckChangesTrue={() => {
            setCheckChanges(!checkChanges);
          }}
          id={cartItemId}
        />
      </div>
    </>
  );
};

export default OrderAssignments;
