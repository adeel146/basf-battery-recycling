import { CEGESOFTHF52, create_account } from "../constants/constants";

export const getTrackingParams = (item) => {
  let params;
  switch (item.value) {
    case "/orders":
      params = {
        page_name: item.name, // Contains a user-friendly name for the page e.g. the title
        page_category: item.name, // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
        page_subcategory: item.componentPath, // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
        page_type: item.value, // Contains the main type for the page like landing  news article error-page
        product_prd: "30530121", // Contains product prd  - multiple values should be comma-separated.
        product_name: CEGESOFTHF52,
      };
      break;
    case "/assignments":
      params = {
        page_name: item.name, // Contains a user-friendly name for the page e.g. the title
        page_category: item.name, // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
        page_subcategory: item.componentPath, // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
        page_type: item.value, // Contains the main type for the page like landing  news article error-page
        product_prd: "30530121", // Contains product prd  - multiple values should be comma-separated.
        product_name: CEGESOFTHF52,
      };
      break;
    case "/settings":
      params = {
        page_name: item.name, // Contains a user-friendly name for the page e.g. the title
        page_category: item.name, // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
        page_subcategory: item.componentPath, // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
        page_type: item.value, // Contains the main type for the page like landing  news article error-page
        product_prd: "30530121", // Contains product prd  - multiple values should be comma-separated.
        product_name: CEGESOFTHF52,
      };
      break;
    case "/logout":
      params = {
        page_name: "Logout", // Contains a user-friendly name for the page e.g. the title
        page_category: "Logout", // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
        page_subcategory: "Logout", // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
        page_type: item.value, // Contains the main type for the page like landing  news article error-page
        product_prd: "30530121", // Contains product prd  - multiple values should be comma-separated.
        product_name: CEGESOFTHF52,
      };
      break;
    case "/create-account":
      params = {
        page_name: create_account, // Contains a user-friendly name for the page e.g. the title
        page_category: create_account, // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
        page_subcategory: create_account, // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
        page_type: item.value, // Contains the main type for the page like landing  news article error-page
        product_prd: "30530121", // Contains product prd  - multiple values should be comma-separated.
        product_name: CEGESOFTHF52,
      };
      break;
    case "/login":
      params = {
        page_name: "login", // Contains a user-friendly name for the page e.g. the title
        page_category: "login", // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
        page_subcategory: "login", // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
        page_type: item.value, // Contains the main type for the page like landing  news article error-page
        product_prd: "30530121", // Contains product prd  - multiple values should be comma-separated.
        product_name: CEGESOFTHF52,
      };
      break;
    default:
  }
  console.log(params);
  return params;
};
export const trackingView = (item) => {
  let params;
  switch (item.value) {
    case "/check-out":
      params = {
        page_name: item.value, // Contains a user-friendly name for the page e.g. the title
        page_category: item.value, // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
        page_subcategory: item.value, // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
        page_type: item.value, // Contains the main type for the page like landing  news article error-page
        product_prd: "30530121", // Contains product prd  - multiple values should be comma-separated.
        product_name: CEGESOFTHF52,
      };
      break;
    case "/user-requests":
      params = {
        page_name: item.value, // Contains a user-friendly name for the page e.g. the title
        page_category: item.value, // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
        page_subcategory: item.value, // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
        page_type: item.value, // Contains the main type for the page like landing  news article error-page
        product_prd: "30530121", // Contains product prd  - multiple values should be comma-separated.
        product_name: CEGESOFTHF52,
      };
      break;
    case "/cart":
      params = {
        page_name: item.value, // Contains a user-friendly name for the page e.g. the title
        page_category: item.value, // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
        page_subcategory: item.value, // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
        page_type: item.value, // Contains the main type for the page like landing  news article error-page
        product_prd: "30530121", // Contains product prd  - multiple values should be comma-separated.
        product_name: CEGESOFTHF52,
      };
      break;
    case "/home":
      params = {
        page_name: item.value, // Contains a user-friendly name for the page e.g. the title
        page_category: item.value, // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
        page_subcategory: item.value, // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
        page_type: item.value, // Contains the main type for the page like landing  news article error-page
        product_prd: "30530121", // Contains product prd  - multiple values should be comma-separated.
        product_name: CEGESOFTHF52,
      };
      break;
    case "/register":
      params = {
        page_name: item.value, // Contains a user-friendly name for the page e.g. the title
        page_category: item.value, // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
        page_subcategory: item.value, // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
        page_type: item.value, // Contains the main type for the page like landing  news article error-page
        product_prd: "30530121", // Contains product prd  - multiple values should be comma-separated.
        product_name: CEGESOFTHF52,
      };
      break;
    case "/select-service":
      params = {
        page_name: item.value, // Contains a user-friendly name for the page e.g. the title
        page_category: item.value, // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
        page_subcategory: item.value, // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
        page_type: item.value, // Contains the main type for the page like landing  news article error-page
        product_prd: "30530121", // Contains product prd  - multiple values should be comma-separated.
        product_name: CEGESOFTHF52,
      };
      break;
    case "/orders":
      params = {
        page_name: item.value, // Contains a user-friendly name for the page e.g. the title
        page_category: item.value, // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
        page_subcategory: item.value, // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
        page_type: item.value, // Contains the main type for the page like landing  news article error-page
        product_prd: "30530121", // Contains product prd  - multiple values should be comma-separated.
        product_name: CEGESOFTHF52,
      };
      break;
    case "/assignments":
      params = {
        page_name: item.value, // Contains a user-friendly name for the page e.g. the title
        page_category: item.value, // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
        page_subcategory: item.value, // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
        page_type: item.value, // Contains the main type for the page like landing  news article error-page
        product_prd: "30530121", // Contains product prd  - multiple values should be comma-separated.
        product_name: CEGESOFTHF52,
      };
      break;
    case "/settings":
      params = {
        page_name: item.value, // Contains a user-friendly name for the page e.g. the title
        page_category: item.value, // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
        page_subcategory: item.value, // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
        page_type: item.value, // Contains the main type for the page like landing  news article error-page
        product_prd: "30530121", // Contains product prd  - multiple values should be comma-separated.
        product_name: CEGESOFTHF52,
      };
      break;
    case "/logout":
      params = {
        page_name: "Logout", // Contains a user-friendly name for the page e.g. the title
        page_category: "Logout", // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
        page_subcategory: "Logout", // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
        page_type: item.value, // Contains the main type for the page like landing  news article error-page
        product_prd: "30530121", // Contains product prd  - multiple values should be comma-separated.
        product_name: CEGESOFTHF52,
      };
      break;
    case "/create-account":
      params = {
        page_name: create_account, // Contains a user-friendly name for the page e.g. the title
        page_category: create_account, // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
        page_subcategory: create_account, // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
        page_type: item.value, // Contains the main type for the page like landing  news article error-page
        product_prd: "30530121", // Contains product prd  - multiple values should be comma-separated.
        product_name: CEGESOFTHF52,
      };
      break;
    case "/login":
      params = {
        page_name: "login", // Contains a user-friendly name for the page e.g. the title
        page_category: "login", // Contains a user-friendly page category  e.g. ‚who we are" or ‚innovation"
        page_subcategory: "login", // Contains a user-friendly page category  e.g. ‚organization"‚ strategy"
        page_type: item.value, // Contains the main type for the page like landing  news article error-page
        product_prd: "30530121", // Contains product prd  - multiple values should be comma-separated.
        product_name: CEGESOFTHF52,
      };
      break;
      default:
  }
  window.utag?.view(params);
};
