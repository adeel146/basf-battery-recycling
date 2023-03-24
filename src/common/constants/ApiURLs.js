export const BASE_URL =
  "https://battery-recyc-main-backend-dev.basf.ilidigital-soft.com/api/";

export const HOME_BUTTON_URL =
  "https://catalysts.basf.com/de/industries/automotive-transportation/batteriematerialien/end-to-end-l%C3%B6sungen-zur-f%C3%B6rderung-der-kreislaufwirtschaft";

export const REFRESH_TOKEN_URL = "v1/user/RefreshToken";
export const LOGIN_URL = "v1/user/Authenticate";
export const LOGOUT_URL = "v1/user/Logout";
export const USER_PROFILE_URL = "v1/Company/GetComapanyProfile";
export const CHANGE_PASSWORD_URL = "v1/user/changePassword";

export const CART_URL = "v1/Cart";
export const UPDATE_CART_URL = "v1/Cart/UpdatePackagingCart";
export const CART_PACKAGING_URL = "v1/Cart/RemovePackagingCartById?cartItemId=";
export const GET_PACKAGING_CART_URL = "v1/Cart/GetPackagingCart";
export const ORDERS_LSIT_TRANSPORT_URL = "v1/Order/orderListByTransportCompany";
export const CART_COUNT_URL = "v1/Cart/GetCountCartItems";
export const DASHBOARD_URL = "v1/Dashboard";
export const CREATE_COMPANY_URL = "v1/Company";
export const UPDATE_COMPANY_URL = "v1/Company/UpdateComapany";
export const FORGET_PASSWORD_URL = "v1/user/SendForgotPasswordCodeByEmail";
export const VERIFY_LINK_URL = "v1/user/Get/Verify/ForgetPasswordCode/";
export const RESET_PASSWORD_URL = "v1/user/RenewPassword";
export const PRODUCT_DETAILS_URL = "v1/Product/detail?";
export const PRODUCT_LIST_URL = "v1/Product?";
export const PACKAGING_PRODUCT_DETAILS_URL =
  "v1/Product/PackagingProductDetailById?";
export const PACKAGING_PRODUCT_LIST_URL = "v1/Product/GetPackagingProducts?";
export const ORDERS_LIST_URL = "v1/Order/orderList";
export const CART_CHECKOUT_URL = "v1/Order";
export const PICKUP_SCOPE_INFO_URL =
  "v1/Order/GetOrderPackagingListByOrderId?orderId=";
export const REPLACEMENT_PACKAGING_INFO_URL =
  "v1/Order/GetReplacementOrderPackagingListByOrderId?orderId=";
export const DEALER_COMPANY_INFO_URL =
  "v1/Company/GetDealerCompanyByDealerCompanyId/";
export const PACKAGING_DEALER_COMPANY_INFO_URL = "/v1/Company/user-detail";
export const TRANSPORTATION_COMPANY_LIST_URL =
  "v1/Company/GetTransportationComapanyListForManagement";
export const UPDATE_TRANSPORTATION_COMPANY_URL =
  "v1/Order/UpdateOrderTranspotation";
export const UPDATE_CART_ITEM_DOCUMENTS_URL_URL =
  "v1/Order/OrderDocumentationSave";
export const CART_ITEM_DOCUMENTS_URL =
  "v1/Order/GetOrderDocumentations?orderId=";
export const ORDER_PICKUP_DATE_TWO_URL = "v1/Order/SaveOrderPickUpDate";
export const OVERALL_EXCEL_EXPORT_URL = "v1/Order/GetOrderListExcelSheet";
export const ORDER_PICKUP_DATE_ONE_URL = "v1/Order/SaveActualOrderPickUpDate";
export const EXCEL_SHEET_DATA_URL = "v1/Order/GetOrderExcelSheet/";

export const ASSIGNMENT_ITEM_UPDATE_URL = "v1/Order/update";
export const ASSIGNMENT_ITEM_DELETE_URL = "v1/Order/RemoveOrderItem";
export const ORDER_DELETE_URL = "v1/Order/DeleteOrderById";
export const ORDER_REVERT_URL =
  "v1/Order/DeleteOrderTranspotationByOrderId?orderId=";
export const GET_DEALER_COMPANYLIST =
  "v1/Dashboard/GetDealerCompanyListForRegistration";
export const GET_DEALER_COMPANYLIST_BYNAME =
  "v1/Dashboard/GetDealerCompanyByName?companyName=";
export const GET_LOADING_FACILITY = "v1/Dashboard/GetLoadingFacility";
export const REGISTER_DEALER_USER = "v1/user/RegisterDealerUser";
export const GET_DEALER_USER_WATCHER_VERIFICATION =
  "v1/Company/dealerUserListForWatcherVerfication";
export const VERIFY_USERACCOUNT = "v1/user/verifyUserAccount";
export const DEL_DOCUMENT = "v1/Order/DeleteOrderDocumentation?";
export const ORDER_COMPLETION_URL = "v1/Order/Checkbox?";
export const UPDATE_WEIGHT_URL = "v1/Order/UpdateWeight";
export const UPDATE_REFERENCE_URL = "v1/Order/UpdateReference";
export const PACKAGING_CART_URL = "v1/Cart/AddPackagingCart";
export const GET_PACKAGING_CART_ITEMS_COUNT_URL =
  "v1/Cart/GetPackagingCartItemsCount";
export const CREATE_PACKAGING_ORDER_URL = "v1/Order/CreatePackagingOrder";
export const GET_PACKAGING_ORDER_URL = "/v1/Order/packagingOrdersList";
export const GET_LOGISTICS_PACKAGING_ORDER_URL =
  "/v1/Order/transportationPackagingOrdersList";
export const ASSIGN_PACKAGING_ORDER =
  "v1/Order/UpdatePackagingOrderTranspotation";
export const UPDATE_PACKAGING = "v1/Order/packaging-order";
