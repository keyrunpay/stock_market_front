import { notification } from "antd";

export const getDetailsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("login_details")) || null;
};

export const displayAllError = err => {
  const keys = Object.keys(err);
  keys.forEach(item => {
    notification.error({
      message: err[item],
      duration: 5
    });
  });
};
