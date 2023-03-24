import axios from "axios";
import {
  ORDERS_LIST_URL,
  ORDERS_LSIT_TRANSPORT_URL,
  TRANSPORTATION_COMPANY_LIST_URL,
  UPDATE_TRANSPORTATION_COMPANY_URL,
  REPLACEMENT_PACKAGING_INFO_URL,
  DEALER_COMPANY_INFO_URL,
  PICKUP_SCOPE_INFO_URL,
  CART_ITEM_DOCUMENTS_URL,
  UPDATE_CART_ITEM_DOCUMENTS_URL_URL,
  ORDER_PICKUP_DATE_ONE_URL,
  ORDER_PICKUP_DATE_TWO_URL,
  EXCEL_SHEET_DATA_URL,
  BASE_URL,
  ASSIGNMENT_ITEM_UPDATE_URL,
  ASSIGNMENT_ITEM_DELETE_URL,
  ORDER_DELETE_URL,
  OVERALL_EXCEL_EXPORT_URL,
  GET_DEALER_COMPANYLIST,
  GET_DEALER_USER_WATCHER_VERIFICATION,
  VERIFY_USERACCOUNT,
  UPDATE_WEIGHT_URL,
  UPDATE_REFERENCE_URL,
  GET_LOADING_FACILITY,
  GET_DEALER_COMPANYLIST_BYNAME,
  PACKAGING_DEALER_COMPANY_INFO_URL,
} from "../constants/ApiURLs";
import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkManager";

export const getOrdersList = async (params) => {
  const { pageNumber, pageSize, key, orderBy, orderType } = params;

  let url = ORDERS_LIST_URL;
  //`PageNumber=${pageNumber}&PageSize=${pageSize}&SearchString=${key}&OrderBy=${orderBy}&OrderType=${orderType}`;
  let payload = {
    pageNumber: pageNumber,
    pageSize: pageSize,
    searchString: key,
    orderBy: orderBy,
    orderType: orderType,
  };
  return await postDataMethod(url, payload);
};
export const GetCompanyList = async (params) => {
  return await getDataMethod(GET_DEALER_COMPANYLIST);
};
export const GetCompanyListByName = async (companyName) => {
  const url = GET_DEALER_COMPANYLIST_BYNAME + companyName;
  return await getDataMethod(url);
};
export const GetLoadingFacility = async (params) => {
  return await getDataMethod(GET_LOADING_FACILITY);
};

export const getOrdersListTransport = async (params) => {
  // const { pageNumber, pageSize, searchString, orderBy, orderType } = params;

  let url = ORDERS_LSIT_TRANSPORT_URL;
  //`?PageNumber=${pageNumber}&PageSize=${pageSize}&SearchString=${key}&OrderBy=${orderBy}&OrderType=${orderType}`;
  // let payload = {
  //   pageNumber: pageNumber,
  //   pageSize: pageSize,
  //   searchString: searchString,
  //   orderBy: orderBy,
  //   orderType: orderType,
  // };
  return await postDataMethod(url, params);
};

export const getTransportationCompanyList = async () => {
  const url = TRANSPORTATION_COMPANY_LIST_URL;

  return await getDataMethod(url);
};
export const GetDealerUserListForWatcherVerfication = async (props) => {
  const url = GET_DEALER_USER_WATCHER_VERIFICATION;

  return await postDataMethod(url, props);
};

export const updateTransportationCompany = async (dataObject) => {
  const url = UPDATE_TRANSPORTATION_COMPANY_URL;

  return await postDataMethod(url, dataObject);
};
export const updateWeight = async (dataObject) => {
  const payload={
    "orderId":dataObject.id,
    "weight":dataObject.weight
  }
  const url =
  //UPDATE_WEIGHT_URL + `orderId=${dataObject.id}&weight=${dataObject.weight}`;
  UPDATE_WEIGHT_URL;

  return await updateDataMethod(url,payload);
};
export const updateReference = async (dataObject) => {
  const payload={
    "orderId":dataObject.id,
    "reference":dataObject.reference
  }
  const url =
    UPDATE_REFERENCE_URL;
   //`orderId=${dataObject.id}&reference=${dataObject.reference}`;

  return await updateDataMethod(url,payload);
};
export const verifyUserAccount = async (dataObject) => {
  const url = VERIFY_USERACCOUNT;

  return await postDataMethod(url, dataObject);
};

export const getEntirePickUpScopeInfo = async (key) => {
  let url = PICKUP_SCOPE_INFO_URL + key;

  return await getDataMethod(url);
};

export const getReplacementPackagingInfo = async (key) => {
  let url = REPLACEMENT_PACKAGING_INFO_URL + key;

  return await getDataMethod(url);
};

export const getDealerCompanyInfo = async (companyId, orderId) => {
  let url = DEALER_COMPANY_INFO_URL + companyId + "?orderID=" + orderId;

  return await getDataMethod(url);
};
export const getPackagingDealerCompanyInfo = async (companyId, orderId) => {
  let url =
    PACKAGING_DEALER_COMPANY_INFO_URL +
    "?dealerCompanyId=" +
    companyId +
    "&orderID=" +
    orderId;

  return await getDataMethod(url);
};
export const getCartItemDocuments = async (key) => {
  let url = CART_ITEM_DOCUMENTS_URL + key;

  return await getDataMethod(url);
};
export const getExcelSheetData = async (key) => {
  try {
    return await axios
      .get(BASE_URL + EXCEL_SHEET_DATA_URL + key, {
        responseType: "blob",
      })
      .then((response) => {
        let data = { status: 200 };
        const url = URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", key + ".xlsx");
        document.body.appendChild(link);
        link.click();
        return data;
      });
  } catch (error) {
    return error.response;
  }
};

export const updateCartItemDocuments = async (dataObject) => {
  const url = UPDATE_CART_ITEM_DOCUMENTS_URL_URL;

  return await postDataMethod(url, dataObject);
};

export const addOrderPickUpDateOne = async (dataObject) => {
  const url = ORDER_PICKUP_DATE_ONE_URL;

  return await postDataMethod(url, dataObject);
};

export const addOrderPickUpDateTwo = async (dataObject) => {
  const url = ORDER_PICKUP_DATE_TWO_URL;

  return await postDataMethod(url, dataObject);
};
export const updateAssignment = async (dataObject) => {
  let url = ASSIGNMENT_ITEM_UPDATE_URL;

  return await updateDataMethod(url, dataObject);
};
export const removeOrderItem = async (key) => {
  let url = ASSIGNMENT_ITEM_DELETE_URL + `/${key}`;

  return await deleteDataMethod(url);
};

export const removeOrder = async (key) => {
  let url = ORDER_DELETE_URL + `?orderId=${key}`;

  return await deleteDataMethod(url);
};
export const exportOverallExcelFile = async (
  dataObject,
  fileName,
  extension
) => {
  try {
    return await axios
      .post(BASE_URL + OVERALL_EXCEL_EXPORT_URL, dataObject, {
        responseType: "blob",
      })
      .then((response) => {
        let data = { status: 200 };
        const url = URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "1" + ".xlsx");
        document.body.appendChild(link);
        link.click();
        return data;
      });
  } catch (error) {
    return error.response;
  }
};
