import { axiosInstance } from "../../utils/AxiosInstance";
import { handleError } from "../apiResponse";

export const fetchSiteSettingApi = () => {
  return axiosInstance().get(`/api/site/basic-info`).catch(handleError);
};

export const postPasswordApi = (data) => {
  return axiosInstance()
    .post("/api/user/change-password", data)
    .catch(handleError);
};

export const postDeactivationApi = (data) => {
  return axiosInstance()
    .post("/api/user/account/status", data)
    .catch(handleError);
};
