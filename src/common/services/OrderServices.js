import {
  CART_CHECKOUT_URL,
  CART_COUNT_URL,
  CART_URL,
  PRODUCT_DETAILS_URL,
  PRODUCT_LIST_URL,
  ORDER_REVERT_URL,
  DEL_DOCUMENT,
  ORDER_COMPLETION_URL,
  PACKAGING_PRODUCT_LIST_URL,
  PACKAGING_PRODUCT_DETAILS_URL,
  PACKAGING_CART_URL,
  GET_PACKAGING_CART_ITEMS_COUNT_URL,
  GET_PACKAGING_CART_URL,
  CART_PACKAGING_URL,
  UPDATE_CART_URL,
  CREATE_PACKAGING_ORDER_URL,
  GET_PACKAGING_ORDER_URL,
  ASSIGN_PACKAGING_ORDER,
  GET_LOGISTICS_PACKAGING_ORDER_URL,
  UPDATE_PACKAGING,
} from "../constants/ApiURLs";

import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkManager";

export const getProductList = async (params) => {
  const { pageNumber, pageSize, key, orderBy, orderType, filter } = params;
  let url =
    PRODUCT_LIST_URL +
    `PageNumber=${pageNumber}&PageSize=${pageSize}&SearchString=${key}&OrderBy=${orderBy}&OrderType=${orderType}&filter=${filter}`;

  return await getDataMethod(url);
};
export const getPackagingProductList = async (params) => {
  const { pageNumber, pageSize, key, orderBy, orderType, filter } = params;
  let url =
    PACKAGING_PRODUCT_LIST_URL +
    `PageNumber=${pageNumber}&PageSize=${pageSize}&SearchString=${key}&filter=${filter}`;

  return await getDataMethod(url);
};
export const revertOrder = async (id) => {
  let url = ORDER_REVERT_URL + id;
  return await deleteDataMethod(url);
};
export const updateOrder = async (dataObject) => {
  let url = CART_URL;

  return await updateDataMethod(url, dataObject);
};
export const updateOrderPackaging = async (dataObject) => {
  let url = UPDATE_CART_URL;

  return await updateDataMethod(url, dataObject);
};
export const getProductDetails = async (key) => {
  let url = PRODUCT_DETAILS_URL + `productId=${key}`;

  return await getDataMethod(url);
};
export const getPackagingProductDetails = async (key) => {
  let url = PACKAGING_PRODUCT_DETAILS_URL + `orderingProductId=${key}`;

  return await getDataMethod(url);
};
export const GetPackagingCartItemsCount = async (key) => {
  let url = GET_PACKAGING_CART_ITEMS_COUNT_URL;

  return await getDataMethod(url);
};
export const placeNewOrder = async (dataObject) => {
  let url = CART_URL;

  return await postDataMethod(url, dataObject);
};
export const addPackagingCart = async (dataObject) => {
  let url = PACKAGING_CART_URL;

  return await postDataMethod(url, dataObject);
};

export const orderCompletion = async (orderId) => {
  let url = ORDER_COMPLETION_URL + `orderId=${orderId}`;

  return await postDataMethod(url, {});
};
export const delDocument = async (obj) => {
  let url =
    DEL_DOCUMENT +
    `OrderId=${obj.OrderId}&DeliveryNote=${obj.DeliveryNote}&AcceptanceSlip=${obj.AcceptanceSlip}`;

  return await deleteDataMethod(url);
};

export const cartCheckout = async (dataObject) => {
  let url = CART_CHECKOUT_URL + "/Create";

  return await postDataMethod(url, dataObject);
};
export const createOrderPackaging = async () => {
  let url = CREATE_PACKAGING_ORDER_URL;
  return await postDataMethod(url);
};

export const getOrdersList = async () => {
  let url = CART_URL;

  return await getDataMethod(url);
};
export const getPackagingOrdersList = async (params) => {
  let url = GET_PACKAGING_ORDER_URL;

  return await postDataMethod(url, params);
};
export const getLogisticsPackagingOrdersList = async (params) => {
  let url = GET_LOGISTICS_PACKAGING_ORDER_URL;

  return await postDataMethod(url, params);
};
export const getOrdersListPackaging = async () => {
  let url = GET_PACKAGING_CART_URL;

  return await getDataMethod(url);
};

export const removeProductFromCart = async (key) => {
  let url = CART_URL + `/${key}`;

  return await deleteDataMethod(url);
};
export const removeProductFromPackagingCart = async (key) => {
  let url = CART_PACKAGING_URL + `${key}`;
  return await deleteDataMethod(url);
};

export const getTotalCountCartItems = async () => {
  let url = CART_COUNT_URL;

  return await getDataMethod(url);
};
export const AssignPackagingOrder = async (dataObject) => {
  let url = ASSIGN_PACKAGING_ORDER;

  return await postDataMethod(url, dataObject);
};

export const updatePackagingList = async (dataObject) => {
  let url = UPDATE_PACKAGING;

  return await updateDataMethod(url, dataObject);
};
