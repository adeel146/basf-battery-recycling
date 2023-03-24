import React, { useEffect, useState } from "react";
import { Accordion, Col, Row, Spinner, Table } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import {
  FotoderBatterie,
  orderType,
  pageSize,
  textdecorationunderline,
  Transportfähigkeitsbescheinigung,
  Transportfähigkeitszustand,
} from "../../../common/constants/constants";
import ActualPickup from "../../../common/modals/ActualPickup";
import ManageDocuments from "../../../common/modals/ManageDocuments";
import OpeningHours from "../../../common/modals/OpeningHours";
import OpeningHoursTwo from "../../../common/modals/OpeningHoursTwo";
import ReplacementPackaging from "../../../common/modals/ReplacementPackaging";
import PickUpScope from "../../../common/modals/PickUpScope";
import {
  getCartItemDocuments,
  getDealerCompanyInfo,
  getEntirePickUpScopeInfo,
  getOrdersListTransport,
  getPackagingDealerCompanyInfo,
  getReplacementPackagingInfo,
} from "../../../common/services/AssignmentServices";
import FilterCard from "../../../common/ui/FilterCard";
import ProgressSteps from "../../../common/ui/ProgressSteps";

import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Weight from "../../../common/modals/weight";
import Reference from "../../../common/modals/Reference";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { trackingView } from "../../../common/utils/PageDetails";
import { getThemeContent } from "../../../common/utils/Utilities";
import {
  getLogisticsPackagingOrdersList,
  getPackagingOrdersList,
} from "../../../common/services/OrderServices";
import { GermanDateFormat } from "../../../common/utils/Utilities";
import { userFileViewer } from "../../../common/services/CommonServices";

const Assignments = () => {
  trackingView({ value: "/assignments" });
  let dashboardData = JSON.parse(localStorage.getItem("dashboardData"));

  const [workingTimeOneModal, setWorkingTimeOneModal] = useState(false);
  const [workingTimeTwoModal, setWorkingTimeTwoModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [pickUpScopeModal, setPickUpScopeModal] = useState(false);
  const [manageDocumentModal, setManageDocumentModal] = useState(false);
  const [replacementPackagingModal, setReplacementPackagingModal] =
    useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [checkChanges, setCheckChanges] = useState(false);
  const [weightModal, setweightModal] = useState(false);
  const [reference, setreference] = useState(false);
  const [dataObj, setdataObj] = useState({});
  const [ordersListResponse, setOrdersListResponse] = useState({});
  const [dealerCompanyResponse, setDealerCompanyResponse] = useState({});
  const [entirePickUpResponse, setEntirePickUpResponse] = useState([]);
  const [orderDetailsResponse, setOrderDetailsResponse] = useState({});
  const [orderId, setorderId] = useState("");
  const [itemDocumentsResponse, setItemDocumentsResponse] = useState({});
  const [replacementPackagingResponse, setReplacementPackagingResponse] =
    useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [searchonClick, setsearchonClick] = useState(false);
  const [filterTableValue, setfilterTableValue] = useState("Abholungen");
  const [ordersListResponsePackaging, setOrdersListResponsePackaging] =
    useState({});

  const handelSearchonClick = () => {
    setsearchonClick(!searchonClick);
  };

  const getListing = async (params) => {
    setPageLoading(true);
    if (filterTableValue === "Abholungen") {
      let result = await getOrdersListTransport(params);
      if (result?.success) {
        setOrdersListResponse(result?.payLoad);
      } else {
        toast.error(result?.message);
      }
    } else if (filterTableValue === "Verpackungsmaterial") {
      let result = await getLogisticsPackagingOrdersList(params);
      if (result?.success) {
        setOrdersListResponsePackaging(result?.payLoad);
      } else {
        toast.error(result?.message);
      }
    }
    setPageLoading(false);
  };
  useEffect(() => {
    window._paq.push(["setUserId", localStorage.getItem("email")]);
    window._paq.push(["trackPageView"]);
  }, []);
  useEffect(() => {
    let params = {
      pageNumber,
      pageSize: pageSize,
      searchString: searchInput,
      orderBy: selectValue,
      orderType: orderType,
    };
    setCheckChanges(false);
    getListing(params);
  }, [pageNumber, searchonClick, selectValue, checkChanges, filterTableValue]);

  const handleNextPage = async (page) => {
    let pageNumber = page.selected + 1;
    setPageNumber(pageNumber);
  };

  const handleChange = (e, key, data) => {
    let value = e.target.value;
    if (key === "selectValue") {
      setSelectValue(value);
    } else if (key === "searchInput") {
      setSearchInput(value);
      setPageNumber(1);
    } else if (key === "weight") {
      setdataObj(data);
      e.stopPropagation();
      setweightModal(true);
    } else if (key === "reference") {
      setdataObj(data);
      e.stopPropagation();
      setreference(true);
    }
  };

  const workingTime1 = async (e, key, item) => {
    e.stopPropagation();
    let result = await getDealerCompanyInfo(
      item?.dealerCompanyId,
      item.orderId
    );
    if (result?.success) {
      if (item?.pickUpDateTarget == null) {
        let obj = {
          day: new Date().getDate(),
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        };
        let date = obj.year + "-" + obj.month + "-" + obj.day;
        let res = {
          pickUpDateTarget: date,
          orderId: item.orderId,
        };
        setOrderDetailsResponse(res);
      } else {
        setOrderDetailsResponse(item);
      }
      setDealerCompanyResponse(result?.payLoad);
      setWorkingTimeTwoModal(true);
    } else {
      toast.error(result?.message);
    }
  };
  const workingTime2 = (e, key, item) => {
    if (item?.pickUpDateIs == null) {
      let obj = {
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      };
      let date = obj.month + "-" + obj.day + "-" + obj.year;
      let res = {
        pickUpDateIs: date,
        orderId: item.orderId,
      };
      setOrderDetailsResponse(res);
    } else {
      setOrderDetailsResponse(item);
    }
  };
  const handleResponse = (result, key) => {
    if (key === "dealerCompanyInfo") {
      if (result?.success) {
        setDealerCompanyResponse(result?.payLoad);
        setInfoModal(true);
      } else {
        toast.error(result?.message);
      }
    } else if (key === "replacePackage") {
      if (result?.success) {
        setReplacementPackagingResponse([...result?.payLoad]);
        setReplacementPackagingModal(true);
      } else {
        toast.error(result?.message);
      }
    } else if (key === "itemDocuments") {
      if (result?.success) {
        setItemDocumentsResponse(result);
        setManageDocumentModal(true);
      } else {
        toast.error(result?.message);
      }
    }
  };

  const handleResponsePickup = (result) => {
    if (result?.success) {
      setEntirePickUpResponse([...result?.payLoad]);
      setPickUpScopeModal(true);
    } else {
      toast.error(result?.message);
    }
  };
  const handleSubmit = async (e, key, item) => {
    e.stopPropagation();
    if (key === "working-time-1") {
      workingTime1(e, key, item);
    } else if (key === "working-time-2") {
      e.stopPropagation();
      workingTime2(e, key, item);
      setWorkingTimeOneModal(true);
    } else if (key === "dealerCompanyInfo") {
      e.stopPropagation();
      let result = await getDealerCompanyInfo(
        item?.dealerCompanyId,
        item.orderId
      );
      handleResponse(result, "dealerCompanyInfo");
      setOrderDetailsResponse(item);
    } else if (key === "replacePackage") {
      e.stopPropagation();
      let result = await getReplacementPackagingInfo(item?.orderId);
      handleResponse(result, "replacePackage");

      setOrderDetailsResponse(item);
    } else if (key === "itemDocuments") {
      setorderId(item?.orderId);
      e.stopPropagation();
      let result = await getCartItemDocuments(item?.orderId);
      handleResponse(result, "itemDocuments");
      setOrderDetailsResponse(item);
    } else if (key === "pickUpScope") {
      e.stopPropagation();
      let result = await getEntirePickUpScopeInfo(item?.orderId);
      handleResponsePickup(result);
      setOrderDetailsResponse(item);
    } else if (key === "weight") {
      setdataObj(item);
      e.stopPropagation();
      setweightModal(true);
    } else if (key === "reference") {
      setdataObj(item);
      e.stopPropagation();
      setreference(true);
    } else if (key === "packagingDealerCompanyInfo") {
      let result = await getPackagingDealerCompanyInfo(
        item?.dealerCompanyId,
        item.packagingOrderId
      );
      if (result?.success) {
        setDealerCompanyResponse(result?.payLoad);
        setInfoModal(true);
      } else {
        toast.error(result?.message);
      }
    }
  };
  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const filterTable = () => {
    return (
      <div className="d-flex align-items-center filter-panel">
        <label className="mt-2">Filtern:</label>
        <div
          className="mt-2 bg-white"
          onClick={() => {
            if (filterTableValue === "Abholungen") {
              setSelectValue("");
              setfilterTableValue("Verpackungsmaterial");
            } else if (filterTableValue === "Verpackungsmaterial") {
              setSelectValue("");
              setfilterTableValue("Abholungen");
            }
          }}
          style={{
            border: `1px solid ${getThemeContent().color}`,
            padding: "0.25rem 0.5rem",
          }}
        >
          <p className="mb-0">{filterTableValue}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="my-page assignment-page logistics-page">
      {!pageLoading ? (
        <>
          <h1>
            <b>Aufträge</b>
          </h1>
          <FilterCard
            newFieldInFilter={true}
            handleChange={(e) => handleChange(e, "selectValue")}
            handleSearch={(e) => handleChange(e, "searchInput")}
            handelSearchonClick={handelSearchonClick}
            value={searchInput}
            dropdownValue={selectValue}
            list={
              filterTableValue === "Abholungen"
                ? dashboardData?.orderOrderByProperties
                : filterTableValue === "Verpackungsmaterial"
                ? dashboardData?.packagingOrderOrderByProperties
                : ""
            }
            filterTable={filterTable}
          />{" "}
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
              containerClassName={`pagination pagination-blue`}
              activeClassName={"active"}
              activeLinkClassName={"active-link"}
              forcePage={pageNumber - 1}
            />
          </div>
          {filterTableValue === "Abholungen" ? (
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
                  <th>Verpackung</th>
                  <th>Gewicht</th>
                  <th>Referenz</th>
                </tr>
              </thead>
              <tbody className="custom-table-body">
                <tr>
                  <td colSpan={11} className="main-td">
                    <Accordion defaultActiveKey="-111">
                      {ordersListResponse?.items?.map((item, index) => (
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
                                          item?.orderCode
                                        );
                                        toast.success(
                                          "Die Auftragsnummer wurde in den Zwischenspeicher kopiert."
                                        );
                                      }}
                                    >
                                      {item?.orderCode}
                                    </td>
                                  </OverlayTrigger>
                                  <td>{GermanDateFormat(item?.createdAt)}</td>
                                  <td>
                                    {item?.releaseDate?.includes("0001")
                                      ? "N/A"
                                      : GermanDateFormat(item?.releaseDate)}
                                  </td>
                                  <td>
                                    {!item?.pickUpDateIs ? (
                                      <span
                                        style={{
                                          color:
                                            item?.pickUpDateTarget == null
                                              ? "#024a96"
                                              : "#212529",
                                        }}
                                        className={
                                          item?.pickUpDateTarget == null ||
                                          item?.pickUpDateIs == null
                                            ? textdecorationunderline
                                            : ""
                                        }
                                        onClick={(e) => {
                                          if (item?.pickUpDateIs) {
                                            return e.stopPropagation();
                                          } else {
                                            handleSubmit(
                                              e,
                                              "working-time-1",
                                              item
                                            );
                                          }
                                        }}
                                      >
                                        {item?.pickUpDateTarget == null
                                          ? "Eingabe"
                                          : "KW" +
                                            " " +
                                            item?.pickUpDateTarget?.slice(6)}
                                      </span>
                                    ) : (
                                      "KW" +
                                      " " +
                                      item?.pickUpDateTarget?.slice(6)
                                    )}
                                  </td>
                                  <td>
                                    <span
                                      style={{
                                        color:
                                          item?.pickUpDateTarget != null
                                            ? item?.pickUpDateIs == null
                                              ? "#024a96"
                                              : "#212529"
                                            : "#212529",
                                      }}
                                      className={
                                        item?.pickUpDateTarget != null
                                          ? item?.pickUpDateIs == null
                                            ? textdecorationunderline
                                            : ""
                                          : ""
                                      }
                                      onClick={(e) =>
                                        handleSubmit(e, "working-time-2", item)
                                      }
                                    >
                                      {item?.pickUpDateTarget
                                        ? item?.pickUpDateTarget != null
                                          ? item?.pickUpDateIs == null
                                            ? "Eingabe"
                                            : item?.pickUpDateIs?.slice(3, 5) +
                                              "/" +
                                              item?.pickUpDateIs?.slice(0, 2) +
                                              "/" +
                                              item?.pickUpDateIs?.slice(6, 10)
                                          : "N/A"
                                        : "N/A"}
                                    </span>
                                  </td>
                                  <td>
                                    <img
                                      src="/assets/icons/info.png"
                                      alt="icon"
                                      onClick={(e) =>
                                        handleSubmit(
                                          e,
                                          "dealerCompanyInfo",
                                          item
                                        )
                                      }
                                    />
                                  </td>
                                  {item?.exchange ? (
                                    <td>
                                      <span
                                        className="text-decoration-underline"
                                        onClick={(e) =>
                                          handleSubmit(
                                            e,
                                            "replacePackage",
                                            item
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
                                        handleSubmit(e, "itemDocuments", item)
                                      }
                                    />
                                  </td>{" "}
                                  <td>
                                    <img
                                      src="/assets/icons/package.png"
                                      alt="icon"
                                      onClick={(e) =>
                                        handleSubmit(e, "pickUpScope", item)
                                      }
                                      style={{
                                        width: "20px",
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <span
                                      style={{
                                        color: item?.weight
                                          ? "#212529"
                                          : "#024a96",
                                      }}
                                      className="text-decoration-underline"
                                      onClick={(e) =>
                                        handleSubmit(e, "weight", item)
                                      }
                                    >
                                      {item?.weight
                                        ? item?.weight + " " + "Kg"
                                        : "Eingabe"}
                                    </span>
                                  </td>
                                  <td>
                                    <span
                                      style={{
                                        color: item?.reference
                                          ? "#212529"
                                          : "#024a96",
                                      }}
                                      className="text-decoration-underline"
                                      onClick={(e) =>
                                        handleSubmit(e, "reference", item)
                                      }
                                    >
                                      {item?.reference ? (
                                        <OverlayTrigger
                                          placement="top"
                                          delay={{ hide: 400 }}
                                          overlay={
                                            <Tooltip id={`tooltip`}>
                                              {item?.reference}
                                            </Tooltip>
                                          }
                                        >
                                          <span>
                                            {truncate(item?.reference, 10)}
                                          </span>
                                        </OverlayTrigger>
                                      ) : (
                                        "Eingabe"
                                      )}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </Accordion.Header>
                          <Accordion.Body>
                            <>
                              <div className="accordion-details-card">
                                <ProgressSteps
                                  active={item?.orderDetail?.orderStatus}
                                  orderId={item?.orderId}
                                  setCheckChangesTrue={() => {
                                    setCheckChanges(true);
                                  }}
                                />
                                <Row>
                                  <Col lg={12}>
                                    {item?.orderDetail?.orderItem?.map(
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
                                                  {
                                                    name:
                                                      item.phone &&
                                                      "Telefon alternative Kontaktperson:",
                                                    value: item.phone
                                                      ? item.phone
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
                                                              {el.code ? (
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
                                        value={item.comments}
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
          ) : (
            <Table
              responsive
              borderless
              className={`table-data my-custom-table mt-3 table-data-blue custom-heading  `}
            >
              <thead
                className="custom-table-head"
                style={{
                  backgroundColor: getThemeContent().color,
                }}
              >
                <tr>
                  <>
                    <th>Auftragsnummer</th>
                    <th>Bestelldatum</th>
                    <th>Info</th>
                    <th></th>
                  </>
                </tr>
              </thead>
              <tbody className={`custom-table-body`}>
                <tr>
                  <td colSpan={8} className="main-td">
                    <Accordion defaultActiveKey="-111">
                      {ordersListResponsePackaging?.items?.map(
                        (itemMain, index) => (
                          <Accordion.Item key={index} eventKey={index}>
                            <Accordion.Header>
                              <Table borderless className="w-100 m-0">
                                <tbody className="absolute-position-custom">
                                  <tr>
                                    <>
                                      <td>{itemMain?.orderCode}</td>
                                      <td>
                                        {GermanDateFormat(itemMain?.orderDate)}
                                      </td>
                                      <td>
                                        <img
                                          src="/assets/icons/info.png"
                                          alt="icon"
                                          onClick={(e) =>
                                            handleSubmit(
                                              e,
                                              "packagingDealerCompanyInfo",
                                              itemMain
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        {itemMain?.deliveryDate?.slice(0, 10)}
                                      </td>
                                    </>
                                  </tr>
                                </tbody>
                              </Table>
                            </Accordion.Header>
                            <Accordion.Body>
                              <>
                                <div className="accordion-details-card">
                                  <Row>
                                    <Col lg={12}>
                                      {itemMain?.packagingOrderItem?.map(
                                        (item, index) => (
                                          <div
                                            key={index}
                                            className="left-side bg-white"
                                          >
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
                                                <Col
                                                  xs={6}
                                                  sm={6}
                                                  md={6}
                                                  lg={8}
                                                >
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
                                                      name: "Name:",
                                                      value: item?.category
                                                        ? item?.category
                                                        : "-",
                                                    },
                                                    {
                                                      name: "Beschreibung:",
                                                      value: item.description
                                                        ? item.description
                                                        : "-",
                                                    },
                                                    {
                                                      name: "Maße Länge x Breite [mm]:",
                                                      value: item.dimensions
                                                        ? item.dimensions
                                                        : "-",
                                                    },

                                                    {
                                                      name: "Traglast [kg]:",
                                                      value: item.weight
                                                        ? item.weight
                                                        : "-",
                                                    },
                                                    {
                                                      name: "Preis:",
                                                      value: item.price
                                                        ? item.price
                                                        : "-",
                                                    },
                                                    {
                                                      name: "Anzahl:",
                                                      value: item.quantity
                                                        ? item.quantity
                                                        : "-",
                                                    },
                                                  ].map((item, index) => (
                                                    <Row key={index}>
                                                      <Col lg={4}>
                                                        <p className="mb-2">
                                                          <b>{item.name}</b>
                                                        </p>
                                                      </Col>
                                                      <Col lg={8}>
                                                        <p className="mb-2">
                                                          <span>
                                                            {item.value}
                                                          </span>
                                                        </p>
                                                      </Col>
                                                    </Row>
                                                  ))}
                                                </Col>
                                              </Row>
                                              <Row></Row>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </Col>
                                  </Row>
                                </div>
                              </>
                            </Accordion.Body>
                          </Accordion.Item>
                        )
                      )}
                    </Accordion>
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
        </>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "70vh",
          }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              height: "60vh",
            }}
          >
            <Spinner animation="border" />
          </div>
        </div>
      )}
      <OpeningHours
        show={workingTimeTwoModal}
        close={(e) => {
          setWorkingTimeTwoModal(false);
        }}
        data={dealerCompanyResponse}
        orderDetails={orderDetailsResponse}
        setCheckChangesTrue={() => {
          setCheckChanges(true);
        }}
      />

      <ActualPickup
        show={workingTimeOneModal}
        close={(e) => {
          setWorkingTimeOneModal(false);
        }}
        orderDetails={orderDetailsResponse}
        setCheckChangesTrue={() => {
          setCheckChanges(true);
        }}
      />
      <Weight
        show={weightModal}
        close={(e) => {
          setweightModal(false);
        }}
        orderDetails={dataObj}
        setCheckChangesTrue={() => {
          setCheckChanges(true);
        }}
      />
      <Reference
        show={reference}
        close={(e) => {
          setreference(false);
        }}
        orderDetails={dataObj}
        setCheckChangesTrue={() => {
          setCheckChanges(true);
        }}
      />
      <OpeningHoursTwo
        show={infoModal}
        close={() => {
          setInfoModal(false);
        }}
        data={dealerCompanyResponse}
      />

      <ReplacementPackaging
        show={replacementPackagingModal}
        close={() => {
          setReplacementPackagingModal(false);
        }}
        data={replacementPackagingResponse}
      />
      <ManageDocuments
        orderId={orderId}
        show={manageDocumentModal}
        close={() => {
          setManageDocumentModal(false);
        }}
        data={itemDocumentsResponse?.payLoad}
        orderDetails={orderDetailsResponse}
        setCheckChangesTrue={() => {
          setCheckChanges(!checkChanges);
        }}
        user="logistics"
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
      <Toaster />
    </div>
  );
};

export default Assignments;
