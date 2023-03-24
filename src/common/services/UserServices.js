import {
  CREATE_COMPANY_URL,
  USER_PROFILE_URL,
  LOGIN_URL,
  LOGOUT_URL,
  CHANGE_PASSWORD_URL,
  FORGET_PASSWORD_URL,
  UPDATE_COMPANY_URL,
  VERIFY_LINK_URL,
  RESET_PASSWORD_URL,
  REGISTER_DEALER_USER
} from "../constants/ApiURLs";
import { getDataMethod, postDataMethod } from "./NetworkManager";

export const loginUser = async (dataObject) => {
  let url = LOGIN_URL;
  return await postDataMethod(url, dataObject);
};
export const registerDealerUser = async (dataObject) => {
  let url = REGISTER_DEALER_USER;
  return await postDataMethod(url, dataObject);
};

export const logoutUser = async (dataObject) => {
  let url = LOGOUT_URL;
  return await postDataMethod(url, dataObject);
};

export const changePassword = async (dataObject) => {
  let url = CHANGE_PASSWORD_URL;
  return await postDataMethod(url, dataObject);
};

export const getUserProfile = async () => {
  let url = USER_PROFILE_URL;
  return await getDataMethod(url);
};

export const sendAccountInfo = async (dataObject) => {
  let url = CREATE_COMPANY_URL;
  return await postDataMethod(url, dataObject);
};

export const editAccountInfo = async (dataObject) => {
  let url = UPDATE_COMPANY_URL;
  return await postDataMethod(url, dataObject);
};

export const forgetPassword = async (dataObject) => {
  let url = FORGET_PASSWORD_URL;
  return await postDataMethod(url, dataObject);
};

export const verifyLink = async (key) => {
  let url = VERIFY_LINK_URL + key;
  return await getDataMethod(url);
};

export const resetPassword = async (dataObject) => {
  let url = RESET_PASSWORD_URL;
  return await postDataMethod(url, dataObject);
};
