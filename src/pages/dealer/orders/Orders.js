import React, { useEffect, useState } from "react";
import {  Spinner } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import "./orders.scss";
import { orderType, pageSize } from "../../../common/constants/constants";
import OrderBatteryCollection from "../../../common/modals/OrderBatteryCollection";
import {
  getProductDetails,
  getProductList,
  getTotalCountCartItems,
} from "../../../common/services/OrderServices";
import FilterCardProducts from "../../../common/ui/FilterCardProducts";
import {
  batteryForm,
  getServiceType,
  getThemeContent,
} from "../../../common/utils/Utilities";
import OrderDetails from "../../../components/dealer/orders/OrderDetails";
import BreadCrumb from "../../../components/BreadCrumb";
import OrderDetailsCustom from "../../../components/dealer/orders/OrderDetailsCustom";
import PropTypes from "prop-types";

const Orders = (props) => {
  let dashboardData = JSON.parse(localStorage.getItem("dashboardData"));
  const [productListResponse, setProductListResponse] = useState({});
  const [productDetailsResponse, setProductDetailsResponse] = useState({});
  const [listLoading, setListLoading] = useState(false);
  const [batteryCollectionModal, setBatteryCollectionModal] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsLoading2, setDetailsLoading2] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [detailsCard, setDetailsCard] = useState(false);
  const [detailsCard2, setDetailsCard2] = useState(false);
  const [detailsBatteryForm, setDetailsBatteryForm] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectValue, setSelectValue] = useState("ItemNumber");
  const [selectFilter, setSelectFilter] = useState("");
  const [cartItemLength, setCartItemLength] = useState(0);
  const [searchonClick, setsearchonClick] = useState(false);
  const getListing = async (params) => {
    setListLoading(true);
    let result = await getProductList(params);

    if (result?.success) {
      setListLoading(false);
      setProductListResponse(result?.payLoad);
    } else {
      setListLoading(false);
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
      filter: selectFilter,
    };

    getListing(params);

    if (getServiceType() === "pickUp") {
      checkCartItems();
    }
    if (getThemeContent().batteryCollectionModal) {
      setBatteryCollectionModal(false);
    }
  }, [pageNumber, searchonClick, selectValue, selectFilter]);

  const handleNextPage = async (page) => {
    let pageNumber = page.selected + 1;
    setPageNumber(pageNumber);
  };
  const handleChange = (e, key) => {
    let value = e.target.value;
    setDetailsCard(false);
    if (key === "selectValue") {
      setSelectValue(value);
    } else if (key === "searchInput") {
      setSearchInput(value);
      setPageNumber(1);
    } else if (key === "filter") {
      setSelectFilter(value);
      setPageNumber(1);
    }
  };

  const closeDetailsCard = () => {
    setDetailsCard(false);
  };
  const closeDetailsCard2 = () => {
    setDetailsCard2(false);
  };
  const handleOrderDetails = async (item, key) => {
    if (key === "orderDetail1") {
      setDetailsLoading(true);
      let result = await getProductDetails(item);
      if (result?.success) {
        setDetailsCard(true);
        setDetailsLoading(false);
        setProductDetailsResponse(result?.payLoad);
        let form = batteryForm(result?.payLoad);
        setDetailsBatteryForm(form);
        if (getServiceType() !== "pickUp") {
          localStorage.setItem(
            "currentProductDetails",
            JSON.stringify(result?.payLoad)
          );
        }
      } else {
        setDetailsLoading(false);
        toast.error(result?.message);
      }
    } else if (key === "orderDetail2") {
      setDetailsCard2(true);
      setDetailsLoading2(false);
    }
  };
  const checkCartItems = async () => {
    let result = await getTotalCountCartItems();
    if (result?.success) {
      setCartItemLength(result?.payLoad?.countCart);
    } else {
      toast.error(result?.message);
    }
  };
  const dummyCartItemLength = () => {
    setCartItemLength(1);
  };

  const { next } = props;
  const breadcrumb = [
    { name: "Service Auswahl", activate: false, link: "/select-service" },
    { name: "Produktübersicht", activate: true },
  ];

  const handelSearchonClick = () => {
    setsearchonClick(!searchonClick);
  };
  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />

      <div className="my-page orders-page">
        {/* <button
          className="bck-btn"
          style={{
            backgroundColor: getThemeContent().color,
          }}
          onClick={() => {
            history.push("/select-service");
            localStorage.removeItem("currentProductDetails");
            localStorage.removeItem("dummyCartItem");
          }}
        >
          <img src="/assets/icons/login-arrow.png" alt="bck" />
          Service auswählen
        </button> */}
        <div style={{ margin: "0 -15% 0 3%" }}>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h1>
              <b>Produktübersicht Batterieabholung</b>
            </h1>
            <div className="cart position-relative" onClick={next}>
              <img
                src={`/assets/icons/${getThemeContent().cartIcon}`}
                alt="cart"
              />
              {cartItemLength > 0 && (
                <div className="notification d-flex justify-content-center align-items-center position-absolute top-0 start-0 rounded-circle">
                  <p className="mb-0">
                    <b>{cartItemLength}</b>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <FilterCardProducts
          handleChange={(e) => handleChange(e, "selectValue")}
          handleSearch={(e) => handleChange(e, "searchInput")}
          handleFilter={(e) => handleChange(e, "filter")}
          handelSearchonClick={handelSearchonClick}
          value={searchInput}
          dropdownValue={selectValue}
          filterValue={selectFilter}
          list={dashboardData?.productOrderByProperties}
          filterList={dashboardData?.getCategoryList}
          marginRight="1rem"
        />{" "}
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <p className="m-0 custom-font-size">
            Showing{" "}
            <b>
              {productListResponse?.items?.length} of{" "}
              {productListResponse?.totalCount}
            </b>{" "}
            Records
          </p>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={productListResponse?.totalPages}
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
        <div className="custom-scrollbar">
          <div className={`${detailsCard ? "d-block" : "d-none"}`}>
            <OrderDetails
              close={closeDetailsCard}
              productId={productDetailsResponse?.productId}
              detailsForm={detailsBatteryForm}
              detailsLoading={detailsLoading}
              dashboardData={dashboardData}
              cartItemLength={checkCartItems}
              dummyCartItemLength={dummyCartItemLength}
              categoryName={productListResponse?.items}
            />
          </div>
          <div className={`${detailsCard2 ? "d-block" : "d-none"}`}>
            <OrderDetailsCustom
              close={closeDetailsCard2}
              detailsLoading={detailsLoading2}
              dashboardData={dashboardData}
              cartItemLength={checkCartItems}
              dummyCartItemLength={dummyCartItemLength}
            />
          </div>
          {!listLoading ? (
            <div className="orders-list pb-5 d-flex flex-wrap">
              {productListResponse?.items?.length > 0 ? (
                productListResponse?.items?.map((item, index) => (
                  <div
                    className="order-card update__design"
                    key={index}
                    onClick={() =>
                      handleOrderDetails(item.productId, "orderDetail1")
                    }
                    style={{
                      border: `1px solid ${getThemeContent().color}`,
                    }}
                  >
                    {detailsCard2 && setDetailsCard2(false)}
                    <h5 title={item.itemNumber}>
                      {item.itemNumber?.slice(0, 25)}
                    </h5>
                    <p className="matching__cars" title={item?.productUsed}>
                      {item.productUsed?.slice(0, 25)}
                    </p>
                    {getServiceType() === "pickUp" && (
                      <p title={item?.categoryName}>
                        {item.categoryName?.slice(0, 25)}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p>
                  Batterie nicht gefunden?{" "}
                  <a
                    onClick={() => handleOrderDetails(123, "orderDetail2")}
                    href="#"
                  >
                    Hier können Sie die Batterie einreichen.
                  </a>
                </p>
              )}
            </div>
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
        </div>
        <Toaster />
        <OrderBatteryCollection
          show={batteryCollectionModal}
          hideModal={() => {
            setBatteryCollectionModal(false);
          }}
        />
      </div>
    </>
  );
};
Orders.propTypes = {
  next: PropTypes.any,
};
export default Orders;
