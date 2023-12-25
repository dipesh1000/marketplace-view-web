import { axiosInstance } from "../../utils/AxiosInstance";
import { handleResponse, handleError } from "../apiResponse";

export const CustomRequestApi = (data) => {
  return axiosInstance()
    .post("/api/order/custom_request", data)
    .then(handleResponse)
    .catch(handleError);
};

export const fetchCustomRequestApi = () => {
  return axiosInstance().get(`/api/order/custom_request`).catch(handleError);
};

export const changeRequestStatusApi = (id, data) => {
  return axiosInstance()
    .post(`/api/order/custom_request/change/status/${id}`, data)
    .then(handleResponse)
    .catch(handleError);
};

export const deleteCustomRequestApi = (id) => {
  return axiosInstance()
    .post(`/api/order/custom_request/delete/${id}`)
    .then(handleResponse)
    .catch(handleError);
};

export const removeOfferApi = (id) => {
  return axiosInstance()
    .post(`/api/order/custom_request/offer/reject/${id}`)
    .then(handleResponse)
    .catch(handleError);
};

export const acceptOfferApi = (id) => {
  return axiosInstance()
    .post(`/api/order/custom_request/offer/order/${id}`)
    .then(handleResponse)
    .catch(handleError);
};
export const fetchOffersApi = (id) => {
  return axiosInstance()
    .get(`/api/order/custom_request/all/offers/${id}`)
    .catch(handleError);
};
