import React, { useEffect, useState } from "react";
import { Accordion, Col, Row, Spinner, Table } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import {
  FotoderBatterie,
  orderType,
  pageSize,
  Transportfähigkeitsbescheinigung,
  Transportfähigkeitszustand,
} from "../../../common/constants/constants";
import {
  getOrdersList,
  getExcelSheetData,
  getDealerCompanyInfo,
  getCartItemDocuments,
} from "../../../common/services/AssignmentServices";
import FilterCard from "../../../common/ui/FilterCard";
import ProgressSteps from "../../../common/ui/ProgressSteps";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ManageDocuments from "../../../common/modals/ManageDocuments";
import OpeningHoursTwo from "../../../common/modals/OpeningHoursTwo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { trackingView } from "../../../common/utils/PageDetails";
import { GermanDateFormat } from "../../../common/utils/Utilities";
import { userFileViewer } from "../../../common/services/CommonServices";

const Assignments = () => {
  trackingView({ value: "/assignments" });

  let dashboardData = JSON.parse(localStorage.getItem("dashboardData"));

  const [searchInput, setSearchInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [infoModal, setInfoModal] = useState(false);
  const [orderDetailsResponse, setOrderDetailsResponse] = useState({});
  const [itemDocumentsResponse, setItemDocumentsResponse] = useState({});
  const [dealerCompanyResponse, setDealerCompanyResponse] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [manageDocumentModal, setManageDocumentModal] = useState(false);

  const [ordersListResponse, setOrdersListResponse] = useState({});
  const [searchonClick, setsearchonClick] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [checkChanges, setCheckChanges] = useState(false);

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
    window._paq.push(["setUserId", localStorage.getItem("email")]);
    window._paq.push(["trackPageView"]);
  }, []);
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

  const handleChange = async (e, key, data) => {
    let value = e.target.value;
    if (key === "selectValue") {
      setSelectValue(value);
    } else if (key === "searchInput") {
      setSearchInput(value);
      setPageNumber(1);
    } else if (key === "documentModal") {
      e.stopPropagation();
      let result = await getCartItemDocuments(data?.orderId);
      if (result?.success) {
        setOrderId(data?.orderId);
        setItemDocumentsResponse(result);
        setManageDocumentModal(true);
      } else {
        toast.error(result?.message);
      }
    } else if (key === "infoModal") {
      e.stopPropagation();
      let result = await getDealerCompanyInfo(
        data?.dealerCompanyId,
        data?.orderId
      );
      if (result?.success) {
        setDealerCompanyResponse(result?.payLoad);
        setInfoModal(true);
      } else {
        toast.error(result?.message);
      }
    }
    setOrderDetailsResponse(data);
  };

  const handleSubmit = async (e, key, item) => {
    if (key === "excelSheet") {
      e.stopPropagation();
      await getExcelSheetData(item?.orderId);
    }
  };
  return (
    <div className="my-page assignment-page recycler-page">
      {!pageLoading ? (
        <>
          <h1>
            <b>Aufträge</b>
          </h1>
          <FilterCard
            handleChange={(e) => handleChange(e, "selectValue")}
            handleSearch={(e) => handleChange(e, "searchInput")}
            handelSearchonClick={handelSearchonClick}
            value={searchInput}
            dropdownValue={selectValue}
            list={dashboardData?.orderOrderByProperties}
          />
          <div className="d-flex flex-wrap justify-content-between align-items-center my-3">
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
              containerClassName={`pagination pagination-blue`}
              activeClassName={"active"}
              activeLinkClassName={"active-link"}
              forcePage={pageNumber - 1}
            />
          </div>
          <Table
            responsive
            borderless
            className="table-data my-custom-table mt-3 table-data-blue"
          >
            <thead className="custom-table-head">
              <tr>
                <th>Auftragsnummer</th>
                <th>Erstellungsdatum</th>
                <th>Freigabedatum</th>
                <th>Abholdatum Soll</th>
                <th>Abholdatum Ist</th>
                <th>Info</th>
                <th>Austausch</th>
                <th>Dokumente</th>
                <th>Gesamtes Gewicht</th>
              </tr>
            </thead>
            <tbody className="custom-table-body">
              <tr>
                <td colSpan={11} className="main-td">
                  <Accordion defaultActiveKey="-111">
                    {ordersListResponse?.items?.map((itemMain, index) => (
                      <Accordion.Item key={index} eventKey={index}>
                        <Accordion.Header>
                          <Table borderless className="w-100 m-0">
                            <tbody>
                              <tr>
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
                                <td>{GermanDateFormat(itemMain?.createdAt)}</td>
                                <td>
                                  {itemMain?.releaseDate.includes("0001")
                                    ? "N/A"
                                    : GermanDateFormat(itemMain?.releaseDate)}
                                </td>
                                <td>
                                  {itemMain?.pickUpDateTarget == null
                                    ? "N/A"
                                    : itemMain?.pickUpDateTarget?.slice(0, 10)}
                                </td>
                                <td>
                                  {itemMain?.pickUpDateIs == null
                                    ? "N/A"
                                    : itemMain?.pickUpDateIs?.slice(3, 5) +
                                      "/" +
                                      itemMain?.pickUpDateIs?.slice(0, 2) +
                                      "/" +
                                      itemMain?.pickUpDateIs?.slice(6, 10)}
                                </td>

                                <td>
                                  <img
                                    src="/assets/icons/info.png"
                                    alt="icon"
                                    onClick={(e) =>
                                      handleChange(e, "infoModal", itemMain)
                                    }
                                  />
                                </td>
                                <td>
                                  {itemMain?.exchange ? (
                                    <span className="text-decoration-underline">
                                      Ja
                                    </span>
                                  ) : (
                                    "Nein"
                                  )}
                                </td>
                                <td>
                                  <img
                                    src="/assets/icons/file.png"
                                    alt="icon"
                                    onClick={(e) =>
                                      handleChange(e, "documentModal", itemMain)
                                    }
                                  />
                                </td>
                                <td>{itemMain?.totalWeight}</td>
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
                                        {/* <div className="head" /> */}
                                        <div className="body">
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
                                                  value: item?.quantity
                                                    ? item?.quantity
                                                    : "-",
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
                                <Col md={4}>
                                  <div className="d-flex justify-content-end align-items-center w-100 mt-4">
                                    <div
                                      className="export d-flex justify-content-end align-items-center"
                                      onClick={(e) => {
                                        handleSubmit(e, "excelSheet", itemMain);
                                      }}
                                    >
                                      <p className="mb-0 me-2 text-decoration-underline">
                                        Export as Excel
                                      </p>
                                      <img
                                        src="/assets/icons/excel.png"
                                        alt="icon"
                                      />
                                    </div>
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
          </Table>{" "}
        </>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "70vh",
          }}
        >
          <Spinner animation="border" />
        </div>
      )}

      <ManageDocuments
        orderId={orderId}
        show={manageDocumentModal}
        close={() => {
          setManageDocumentModal(false);
        }}
        data={itemDocumentsResponse.payLoad}
        orderDetails={orderDetailsResponse}
        setCheckChangesTrue={() => {
          setCheckChanges(!checkChanges);
        }}
        user="oem"
      />
      <OpeningHoursTwo
        showBuno
        show={infoModal}
        close={() => {
          setInfoModal(false);
        }}
        data={dealerCompanyResponse}
      />
      <Toaster />
    </div>
  );
};

export default Assignments;
