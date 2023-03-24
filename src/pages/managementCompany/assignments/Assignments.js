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
  textdecorationunderline,
} from "../../../common/constants/constants";
import AssignLogisticsCompany from "../../../common/modals/AssignLogisticsCompany";
import ManageDocuments from "../../../common/modals/ManageDocuments";
import OpeningHoursTwo from "../../../common/modals/OpeningHoursTwo";
import ReplacementPackaging from "../../../common/modals/ReplacementPackaging";
import PickUpScope from "../../../common/modals/PickUpScope";
import {
  getCartItemDocuments,
  getExcelSheetData,
  getOrdersList,
  getPackagingDealerCompanyInfo,
  getTransportationCompanyList,
} from "../../../common/services/AssignmentServices";
import {
  getDealerCompanyInfo,
  getEntirePickUpScopeInfo,
  getReplacementPackagingInfo,
} from "../../../common/services/AssignmentServices";
import ProgressSteps from "../../../common/ui/ProgressSteps";
import FilterCard from "../../../common/ui/FilterCard";
import { getThemeContent } from "../../../common/utils/Utilities";

import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import UpdateOrderDetails from "../../../common/modals/UpdateAssignementDetails";
import DeleteAssignment from "../../../common/modals/DeleteAssignment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteOrder from "../../../common/modals/DeleteOrder";
import RevertOrder from "../../../common/modals/RevertOrder";
import UpdateOrderDetailsCustom from "../../../common/modals/UpdateOrderDetailCustom";
import { getPackagingOrdersList } from "../../../common/services/OrderServices";
import { GermanDateFormat } from "../../../common/utils/Utilities";
import { userFileViewer } from "../../../common/services/CommonServices";
import OpeningHours from "../../../common/modals/OpeningHours";
import ActualPickup from "../../../common/modals/ActualPickup";

const Assignments = () => {
  let dashboardData = JSON.parse(localStorage.getItem("dashboardData"));

  const [infoModal, setInfoModal] = useState(false);
  const [updateOrderDetailsModalCustom, setUpdateOrderDetailsModalCustom] =
    useState(false);
  const [assignCompanyModal, setAssignCompanyModal] = useState(false);
  const [deleteOrderModal, setDeleteOrderModal] = useState(false);
  const [RevertOrderModal, setRevertOrderModal] = useState(false);
  const [manageDocumentModal, setManageDocumentModal] = useState(false);
  const [replacementPackagingModal, setReplacementPackagingModal] =
    useState(false);
  const [pickUpScopeModal, setPickUpScopeModal] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [checkChanges, setCheckChanges] = useState(false);

  const [ordersListResponse, setOrdersListResponse] = useState({});
  const [ordersListResponsePackaging, setOrdersListResponsePackaging] =
    useState({});
  const [dealerCompanyResponse, setDealerCompanyResponse] = useState({});
  const [entirePickUpResponse, setEntirePickUpResponse] = useState([]);
  const [orderDetailsResponse, setOrderDetailsResponse] = useState({});
  const [itemDocumentsResponse, setItemDocumentsResponse] = useState({});
  const [replacementPackagingResponse, setReplacementPackagingResponse] =
    useState([]);
  const [companyList, setCompanyList] = useState({});
  const [workingTimeOneModal, setWorkingTimeOneModal] = useState(false);
  const [workingTimeTwoModal, setWorkingTimeTwoModal] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [orderId, setOrderId] = useState("");
  const [filterTableValue, setFilterTableValue] = useState("Abholungen");
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [cartItemId, setCartItemId] = useState("");
  const [updateOrderDetailsModal, setUpdateOrderDetailsModal] = useState(false);
  const [searchonClick, setsearchonClick] = useState(false);

  const handelSearchonClick = () => {
    setsearchonClick(!searchonClick);
  };
  console.log(ordersListResponsePackaging, "ordersListResponsePackaging");
  const getListing = async () => {
    setPageLoading(true);
    if (filterTableValue === "Abholungen") {
      let params = {
        pageNumber,
        pageSize: pageSize,
        key: searchInput,
        orderBy: selectValue,
        orderType: orderType,
      };
      let result = await getOrdersList(params);
      if (result?.success) {
        setPageLoading(false);
        setOrdersListResponse(result?.payLoad);
      } else {
        setPageLoading(false);
        if (result?.message) {
          toast.error(result?.message);
        }
      }
    } else {
      let params = {
        pageNumber,
        pageSize: pageSize,
        searchString: searchInput,
        orderType: orderType,
        orderBy: selectValue,
      };
      let result = await getPackagingOrdersList(params);
      if (result?.success) {
        setPageLoading(false);
        setOrdersListResponsePackaging(result?.payLoad);
      } else {
        setPageLoading(false);
        toast.error(result?.message);
      }
    }
  };
  useEffect(() => {
    window._paq.push(["setUserId", localStorage.getItem("email")]);
    window._paq.push(["trackPageView"]);
  }, []);
  useEffect(() => {
    setCheckChanges(false);
    getListing();
  }, [pageNumber, searchonClick, selectValue, checkChanges, filterTableValue]);

  const handleNextPage = async (page) => {
    let pageNumber = page.selected + 1;
    setPageNumber(pageNumber);
  };

  const handleChange = (e, key) => {
    let value = e.target.value;
    if (key === "selectValue") {
      setSelectValue(value);
    } else if (key === "searchInput") {
      setSearchInput(value);
      setPageNumber(1);
    } else if (key === "filterTable") {
      if (filterTableValue === "Abholungen") {
        setSelectValue("");
        setFilterTableValue("Verpackungsmaterial");
      } else {
        setSelectValue("");
        setFilterTableValue("Abholungen");
      }
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
        setItemDocumentsResponse(result.payLoad);
        setManageDocumentModal(true);
      } else {
        toast.error(result?.message);
      }
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
    } else if (key === "replacePackage") {
      e.stopPropagation();
      let result = await getReplacementPackagingInfo(item?.orderId);
      handleResponse(result, "replacePackage");
    } else if (key === "itemDocuments") {
      e.stopPropagation();
      let result = await getCartItemDocuments(item?.orderId);
      handleResponse(result, "itemDocuments");
    } else if (key === "pickUpScope") {
      e.stopPropagation();
      let result = await getEntirePickUpScopeInfo(item?.orderId);
      if (result?.success) {
        setEntirePickUpResponse([...result?.payLoad]);
        setPickUpScopeModal(true);
      } else {
        toast.error(result?.message);
      }
    } else if (key === "excelSheet") {
      e.stopPropagation();
      await getExcelSheetData(item?.orderId);
    } else if (key === "itemDetails") {
      item.isTemporary
        ? setUpdateOrderDetailsModalCustom(true)
        : setUpdateOrderDetailsModal(true);
    } else if (key === "deleteOrder") {
      setDeleteOrderModal(true);
    } else if (key === "revert") {
      setRevertOrderModal(true);
    } else if (key === "packagingDealerCompanyInfo") {
      let result = await getPackagingDealerCompanyInfo(
        item?.dealerCompanyId,
        item.packagingOrderId
      );
      handleResponse(result, "dealerCompanyInfo");
    }
    setOrderDetailsResponse(item);
  };
  const getCompanyList = async () => {
    let result = await getTransportationCompanyList();

    if (result?.success) {
      setAssignCompanyModal(true);
      setCompanyList(result);
    }
  };

  const filterTable = () => {
    return (
      <div className="d-flex align-items-center filter-panel">
        <label className="mt-2">Filtern:</label>
        <div
          className="mt-2 bg-white"
          onClick={(e) => handleChange(e, "filterTable")}
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
  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <div className="my-page assignment-page management-company-page pb-5">
      {!pageLoading ? (
        <>
          <h1>
            <b>Aufträge </b>
          </h1>
          <FilterCard
            handleChange={(e) => handleChange(e, "selectValue")}
            handleSearch={(e) => handleChange(e, "searchInput")}
            handelSearchonClick={handelSearchonClick}
            value={searchInput}
            dropdownValue={selectValue}
            filterTable={filterTable}
            newFieldInFilter={true}
            list={
              filterTableValue === "Abholungen"
                ? dashboardData?.orderOrderByProperties
                : filterTableValue === "Verpackungsmaterial"
                ? dashboardData?.packagingOrderOrderByProperties
                : ""
            }
            marginRight="1rem"
            tableType={filterTableValue}
          />{" "}
          <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
            <p className="m-0 custom-font-size"></p>
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={
                filterTableValue === "Abholungen"
                  ? ordersListResponse?.totalPages
                  : ordersListResponsePackaging?.totalPages
              }
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
              className={`table-data my-custom-table mt-3 table-data-blue ${
                filterTableValue === "Verpackungsmaterial" &&
                "table-data-management-only"
              }`}
            >
              <thead className="custom-table-head">
                <tr>
                  {filterTableValue === "Abholungen" ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <th className="filter_Data">Auftragsnummer</th>
                      <th className="filter_Data">Bestelldatum</th>
                      <th className="filter_Data">Info</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="custom-table-body">
                <tr>
                  <td colSpan={11} className="main-td">
                    <Accordion defaultActiveKey="-111">
                      {ordersListResponse?.items?.map((itemMain, index) => (
                        <Accordion.Item
                          key={index}
                          eventKey={index}
                          onClick={(e) => {
                            setOrderId(itemMain?.orderId);
                          }}
                        >
                          <Accordion.Header>
                            <Table borderless className="w-100 m-0">
                              <tbody>
                                <tr>
                                  {filterTableValue === "Abholungen" ? (
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
                                        <span
                                          style={{
                                            color:
                                              itemMain?.pickUpDateTarget == null
                                                ? "#024a96"
                                                : "#212529",
                                            cursor:
                                              itemMain?.pickUpDateIs && "text",
                                          }}
                                          className={
                                            itemMain?.pickUpDateTarget ==
                                              null ||
                                            itemMain?.pickUpDateIs == null
                                              ? textdecorationunderline
                                              : ""
                                          }
                                          onClick={(e) => {
                                            if (itemMain?.pickUpDateIs) {
                                              return e.stopPropagation();
                                            } else {
                                              handleSubmit(
                                                e,
                                                "working-time-1",
                                                itemMain
                                              );
                                            }
                                          }}
                                        >
                                          {itemMain?.pickUpDateTarget == null
                                            ? "Eingabe"
                                            : "KW" +
                                              " " +
                                              itemMain?.pickUpDateTarget?.slice(
                                                6
                                              )}
                                        </span>
                                      </td>
                                      <td>
                                        {itemMain?.pickUpDateTarget ? (
                                          <span
                                            style={{
                                              color:
                                                itemMain?.pickUpDateTarget !=
                                                null
                                                  ? itemMain?.pickUpDateIs ==
                                                    null
                                                    ? "#024a96"
                                                    : "#212529"
                                                  : "#212529",
                                            }}
                                            className={
                                              itemMain?.pickUpDateTarget != null
                                                ? itemMain?.pickUpDateIs == null
                                                  ? textdecorationunderline
                                                  : ""
                                                : ""
                                            }
                                            onClick={(e) =>
                                              handleSubmit(
                                                e,
                                                "working-time-2",
                                                itemMain
                                              )
                                            }
                                          >
                                            {itemMain?.pickUpDateTarget != null
                                              ? itemMain?.pickUpDateIs == null
                                                ? "Eingabe"
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
                                                  )
                                              : "N/A"}
                                          </span>
                                        ) : (
                                          "N/A"
                                        )}
                                      </td>
                                      <td>
                                        <img
                                          src="/assets/icons/info.png"
                                          alt="icon"
                                          onClick={(e) =>
                                            handleSubmit(
                                              e,
                                              "dealerCompanyInfo",
                                              itemMain
                                            )
                                          }
                                        />
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
                                      <td>
                                        {itemMain?.weight
                                          ? itemMain?.weight + " Kg"
                                          : "N/A"}
                                      </td>
                                      <td>
                                        {itemMain?.reference ? (
                                          <OverlayTrigger
                                            placement="top"
                                            delay={{ hide: 400 }}
                                            overlay={
                                              <Tooltip id={`tooltip`}>
                                                {itemMain?.reference}
                                              </Tooltip>
                                            }
                                          >
                                            <span>
                                              {truncate(
                                                itemMain?.reference,
                                                10
                                              )}
                                            </span>
                                          </OverlayTrigger>
                                        ) : (
                                          "N/A"
                                        )}
                                      </td>
                                    </>
                                  ) : (
                                    <>
                                      <td className="filter_Data">
                                        {itemMain?.orderCode}
                                      </td>
                                      <td className="filter_Data">
                                        {itemMain?.createdAt?.slice(0, 10)}
                                      </td>
                                      <td className="filter_Data">
                                        <img
                                          src="/assets/icons/info.png"
                                          alt="icon"
                                        />
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
                                <div
                                  className="d-flex"
                                  style={{
                                    "align-items": "center",
                                    "margin-bottom": "1rem",
                                  }}
                                >
                                  {filterTableValue === "Abholungen" && (
                                    <ProgressSteps
                                      userType={"management"}
                                      active={
                                        itemMain?.orderDetail?.orderStatus
                                      }
                                    />
                                  )}
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="ms-auto me-5 mt-1 text-danger"
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    onClick={(e) =>
                                      handleSubmit(e, "deleteOrder", itemMain)
                                    }
                                  />
                                </div>
                                <Row>
                                  <Col lg={12}>
                                    {itemMain?.orderDetail?.orderItem?.map(
                                      (item, index) => (
                                        <div
                                          key={index}
                                          className="left-side bg-white"
                                        >
                                          <div className="body">
                                            <Row>
                                              <Col xs={6} sm={6} md={6} lg={4}>
                                                {item.isTemporary && (
                                                  <div className="d-flex customflag">
                                                    <div className="d-flex innerflag">
                                                      <FontAwesomeIcon
                                                        className="mr-2"
                                                        style={{
                                                          color: "black",
                                                        }}
                                                        icon={faInfoCircle}
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
                                                <div>
                                                  {itemMain?.orderDetail
                                                    ?.orderStatus === 1 &&
                                                  filterTableValue ===
                                                    "Abholungen" ? (
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
                                                    filterTableValue ===
                                                      "Abholungen" && (
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
                                                    )
                                                  )}
                                                </div>
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
                                  <Col>
                                    <div className="d-flex justify-content-end align-items-center w-100 mt-4">
                                      {filterTableValue === "Abholungen" && (
                                        <div
                                          className="export d-flex justify-content-end align-items-center"
                                          onClick={(e) => {
                                            handleSubmit(
                                              e,
                                              "excelSheet",
                                              itemMain
                                            );
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
                                      )}
                                      <div className="d-flex justify-content-end ms-3">
                                        {itemMain?.orderDetail?.orderStatus ===
                                          1 &&
                                        filterTableValue === "Abholungen" ? (
                                          <button
                                            type="button"
                                            onClick={getCompanyList}
                                            className="ms-2 export-btn"
                                          >
                                            Freigeben
                                          </button>
                                        ) : itemMain?.orderDetail
                                            ?.orderStatus === 2 &&
                                          filterTableValue === "Abholungen" ? (
                                          <button
                                            type="button"
                                            onClick={(e) =>
                                              handleSubmit(
                                                e,
                                                "revert",
                                                itemMain
                                              )
                                            }
                                            className="ms-2 export-btn"
                                          >
                                            Freigabe zurückziehen
                                          </button>
                                        ) : itemMain?.orderDetail
                                            ?.orderStatus === 3 &&
                                          filterTableValue === "Abholungen" ? (
                                          <button
                                            type="button"
                                            className="ms-2 export-btn disabled-item"
                                          >
                                            Freigabe zurückziehen
                                          </button>
                                        ) : (
                                          filterTableValue === "Abholungen" && (
                                            <button
                                              type="button"
                                              className="ms-2 export-btn disabled-item"
                                            >
                                              Freigabe zurückziehen
                                            </button>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            </>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>{" "}
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
                          <Accordion.Item
                            key={index}
                            eventKey={index}
                            onClick={(e) => {
                              console.log(itemMain, "itemmain");
                              setOrderId(itemMain?.packagingOrderId);
                            }}
                          >
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
                                  <div className="d-flex justify-content-end mt-2 ms-3">
                                    {/* {itemMain?.orderDetail?.orderStatus === 1 &&
                                    filterTableValue === "Abholungen" ? ( */}

                                    <button
                                      type="button"
                                      onClick={() => {
                                        setOrderId();
                                        getCompanyList();
                                      }}
                                      className="ms-2 export-btn"
                                    >
                                      Freigeben
                                    </button>
                                    {/* ) : itemMain?.orderDetail?.orderStatus ===
                                        2 &&
                                      filterTableValue === "Abholungen" ? (
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          handleSubmit(e, "revert", itemMain)
                                        }
                                        className="ms-2 export-btn"
                                      >
                                        Freigabe zurückziehen
                                      </button>
                                    ) : itemMain?.orderDetail?.orderStatus ===
                                        3 &&
                                      filterTableValue === "Abholungen" ? (
                                      <button
                                        type="button"
                                        className="ms-2 export-btn disabled-item"
                                      >
                                        Freigabe zurückziehen
                                      </button>
                                    ) : (
                                      filterTableValue === "Abholungen" && (
                                        <button
                                          type="button"
                                          className="ms-2 export-btn disabled-item"
                                        >
                                          Freigabe zurückziehen
                                        </button>
                                      )
                                    )} */}
                                  </div>
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
          <Spinner animation="border" />
        </div>
      )}
      <Toaster />
      <OpeningHours
        show={workingTimeTwoModal}
        close={() => {
          setWorkingTimeTwoModal(false);
        }}
        data={dealerCompanyResponse}
        orderDetails={orderDetailsResponse}
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
      <ReplacementPackaging
        show={replacementPackagingModal}
        close={() => {
          setReplacementPackagingModal(false);
        }}
        data={replacementPackagingResponse}
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
      <ManageDocuments
        show={manageDocumentModal}
        close={() => {
          setManageDocumentModal(false);
        }}
        data={itemDocumentsResponse}
        orderDetails={orderDetailsResponse}
        setCheckChangesTrue={() => {
          setCheckChanges(true);
        }}
        user="management"
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
      <AssignLogisticsCompany
        filterTableValue={filterTableValue}
        show={assignCompanyModal}
        close={() => {
          setAssignCompanyModal(false);
        }}
        id={orderId}
        list={companyList}
        setCheckChangesTrue={() => {
          setCheckChanges(true);
        }}
      />
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
          setCheckChanges(true);
        }}
      />
      <DeleteAssignment
        show={deleteProductModal}
        close={() => {
          setDeleteProductModal(false);
        }}
        setCheckChangesTrue={() => {
          setCheckChanges(true);
        }}
        id={cartItemId}
      />
      <DeleteOrder
        show={deleteOrderModal}
        close={() => {
          setDeleteOrderModal(false);
        }}
        setCheckChangesTrue={() => {
          setCheckChanges(true);
        }}
        id={orderDetailsResponse?.orderId}
      />
      <RevertOrder
        show={RevertOrderModal}
        close={() => {
          setRevertOrderModal(false);
        }}
        id={orderDetailsResponse?.orderId}
        setCheckChangesTrue={() => {
          setCheckChanges(true);
        }}
      />
    </div>
  );
};

export default Assignments;
