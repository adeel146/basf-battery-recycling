import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/esm/Table";
import FilterCard from "../../../common/ui/FilterCard";
import { Spinner } from "react-bootstrap";
import DeleteUserRequest from "../../../common/modals/DeleteUserRequest";
import { GetDealerUserListForWatcherVerfication } from "../../../common/services/AssignmentServices";
import UserInfo from "../../../common/modals/UserInfo";
import { orderType, pageSize } from "../../../common/constants/constants";
import { useLocation } from "react-router-dom";
import FeedbackMessage from "../../../common/modals/FeedbackMessage";
import "./usersrequest.scss";
import ReactPaginate from "react-paginate";
import {trackingView} from "../../../common/utils/PageDetails";

function UsersRequests() {
  trackingView({"value":"/user-requests"});

  let dashboardData = JSON.parse(localStorage.getItem("dashboardData"));
  const [feedbackModal, setfeedbackModal] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [ShowInfo, setShowInfo] = useState(false);
  const [ordersListResponse, setOrdersListResponse] = useState({});

  const [searchInput, setSearchInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [CheckChanges, setCheckChanges] = useState(false);
  const [pageLoading, setpageLoading] = useState(true);
  const [DealerList, setDealerList] = useState([]);
  const [modalData, setmodalData] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [searchonClick, setsearchonClick] = useState(false)


  const handelSearchonClick=()=>{
    setsearchonClick(!searchonClick)
  }
  useEffect(() => {
    window._paq.push(["setUserId", localStorage.getItem("email")]);
    window._paq.push(["trackPageView"]);
  },[]);
  useEffect(() => {
    let params = {
      pageNumber,
      pageSize: pageSize,
      searchString: searchInput,
      orderBy: selectValue,
      orderType: orderType,
    };
    GetDealerUserList(params);
  }, [CheckChanges, pageNumber, searchonClick, selectValue]);
  const { search } = useLocation();
  const GetDealerUserList = async (params) => {
    setpageLoading(true);
    const data = await GetDealerUserListForWatcherVerfication(params);
    setDealerList(data?.payLoad?.items);
    setOrdersListResponse(data?.payLoad);
    setpageLoading(false);
    const searchQuery = search.slice(4);
    if (searchQuery) {
      const obj = data.payLoad.filter((item) => item.userId === searchQuery);
      const dataObj = Object.assign({}, ...obj);
      console.log(dataObj, "dataObj");
      !dataObj.emailVeryfy && handleModal(dataObj, "Freigeben");
    }
  };
  const handleModal = (props, key) => {
    if (key === "Freigeben") {

      setmodalData(props);
      setDeleteProductModal(true);
    } else if (key === "info") {
      setmodalData(props);
      setShowInfo(true);
    }
  };

  const handleUpdate = () => {
    setCheckChanges(!CheckChanges);
  };
  const handleChange = (e, key) => {
    let value = e.target.value;
    if (key === "selectValue") {
      setSelectValue(value);
    } else if (key === "searchInput") {
      setSearchInput(value);
    }
  };
  const handleSecond = () => {
    setDeleteProductModal(false);
    setfeedbackModal(true);
  };
  const handleNextPage = async (page) => {
    let pageNumber = page.selected + 1;
    setPageNumber(pageNumber);
  };
  return (
    <div className="main-div my-page">
      {!pageLoading ? (
        <>
          <h1>NUTZER</h1>
          <FilterCard
            handleChange={(e) => handleChange(e, "selectValue")}
            handleSearch={(e) => handleChange(e, "searchInput")}
            handelSearchonClick={handelSearchonClick}
            value={searchInput}
            dropdownValue={selectValue}
            noexporticon
            list={
              dashboardData?.userApprovalSortingList
                ? dashboardData?.userApprovalSortingList
                : []
            }
          />
          <div className="pagination-div">
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
          <div className="main ">
            <Table responsive borderless className="my-table table-responsive">
              <thead className="head">
                <tr className="">
                  <th>Nutzer&nbsp;ID</th>
                  <th>Erstellungsdatum</th>
                  <th>Freigabedatum</th>
                  <th>Info</th>
                </tr>
              </thead>
              {DealerList &&
                DealerList.map((item, index) => {
                  return (
                    <tbody key={index} className="body">
                      <tr className="seperator">
                        <td>{item.userCode} </td>
                        <td>{item.createdDate} </td>
                        <td>
                          {item.emailVeryfy ? (
                            <span>{item.releaseDate}</span>
                          ) : (
                            <span
                              onClick={() => handleModal(item, "Freigeben")}
                              className="Freigeben"
                            >
                              Nutzer-Zugang verwalten
                            </span>
                          )}
                        </td>
                        <td>
                          <div className="flex-icon">
                            <img
                              src="/assets/icons/info.png"
                              alt="icon"
                              width={20}
                              height={20}
                              onClick={() => handleModal(item, "info")}
                              style={{ cursor: "pointer" }}
                            />
                            <span>
                              {item.emailVeryfy
                                ? "Nutzer freigegeben"
                                : "Nutzer noch nicht freigegeben"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </Table>
            {/* <Sidebar /> */}
          </div>
          <DeleteUserRequest
            show={deleteProductModal}
            close={() => {
              setDeleteProductModal(false);
            }}
            setDeleteProductModal={setDeleteProductModal}
            setCheckChangesTrue={handleUpdate}
            modalData={modalData}
            handleSecond={handleSecond}
          />
          <UserInfo
            show={ShowInfo}
            close={() => {
              setShowInfo(false);
            }}
            modalData={modalData}
          />
          <FeedbackMessage
            show={feedbackModal}
            close={() => {
              setfeedbackModal(false);
            }}
            setDeleteProductModal={setDeleteProductModal}
            setCheckChangesTrue={handleUpdate}
            modalData={modalData}
          />
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
    </div>
  );
}

export default UsersRequests;
