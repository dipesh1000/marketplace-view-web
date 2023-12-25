import { axiosInstance } from "../../utils/AxiosInstance";
import { handleError, handleResponse } from "../apiResponse";

export const publishGigApi = (data,id) => {
  return axiosInstance()
    .post(`/api/seller/gig/update/${id}`, data)
    .then(handleResponse)
    .catch(handleError);
};
