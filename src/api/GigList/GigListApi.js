import { axiosInstance } from "../../utils/AxiosInstance";
import { handleError, handleResponse } from "../apiResponse";

export const fetchGigByCategoryApi = (slug, data, page_no) => {
  return axiosInstance()
    .post(`/api/gig/category/${slug}?page=${page_no || 1}`, data)
    .catch(handleError);
};

export const fetchGigmetaByCategoryApi = (slug) => {
  return axiosInstance()
    .get(`/api/category/gig_meta/${slug}`)
    .catch(handleError);
};

export const fetchServiceTypeByCategoryApi = (slug) => {
  return axiosInstance()
    .get(`/api/category/service_type/${slug}`)
    .catch(handleError);
};

export const fetchSellerDetailsApi = () => {
  return axiosInstance().get(`/api/gig/seller-details`).catch(handleError);
};

export const fetchGigBySlugApi = (slug) => {
  return axiosInstance().get(`/api/gig/${slug}`);
};

export const fetchtempGigListApi = () => {
  return axiosInstance().get("api/gig/front");
};

export const reportGigIssueApi = (data) => {
  return axiosInstance()
    .post(`/api/gig/report-gig`, data)
    .then(handleResponse)
    .catch(handleError);
};

export const fetchFeedbackBySlugApi = (slug, filterData) => {
  return axiosInstance().get(`/api/gig/feedback/${slug}?page=${filterData?.page ?? null}&rating_type=${filterData?.rating_type ?? null}&sort_by=${filterData?.sort_by ?? null}`);
};

export const postReviewStatusApi = (data, id) => {
  return axiosInstance()
    .post(`/api/gig/feedback/action/${id}`, {type: data})
    .then(handleResponse)
    .catch(handleError);
};

