import { axiosInstance } from "../../utils/AxiosInstance";
import { handleError } from "../apiResponse";

export const getSellerDashboardApi = () => {
  return axiosInstance().get(`/api/seller/profile`).catch(handleError);
};
