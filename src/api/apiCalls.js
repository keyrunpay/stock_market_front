import { axiosInstance } from "./axiosInterceptor";

export const uploadFile = payload => {
  return axiosInstance.post("upload", payload);
};

export const doLogin = payload => {
  return axiosInstance.post("login", payload);
};

export const getStores = () => {
  return axiosInstance.get("store_all");
};

export const getUsers = () => {
  return axiosInstance.get("user");
};

export const addContents = payload => {
  return axiosInstance.get("user");
};
export const addUser = payload => {
  return axiosInstance.post("user", payload);
};
export const addStore = payload => {
  return axiosInstance.post("store", payload);
};
export const getRoles = () => {
  return axiosInstance.get("view_user_role");
};
