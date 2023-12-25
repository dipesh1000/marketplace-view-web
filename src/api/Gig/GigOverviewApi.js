import { axiosInstance } from "../../utils/AxiosInstance";
import { handleError, handleResponse } from "../apiResponse";

export function addGigOverviewApi(data) {
  return axiosInstance()
    .post("/api/seller/gig/store", data)
    .then(handleResponse)
    .catch(handleError);
}
export function editGigOverviewApi(data, id){
    return axiosInstance()
      .post(`/api/seller/gig/update/${id}`, data)
      .then(handleResponse)
      .catch(handleError);
}
export function fetchSearchTagApi(){
    return axiosInstance().get("/api/seller/searchtags");
}


export function fetchCategoryApi(){
    return axiosInstance().get("/api/seller/categories");
}
export function fetchCategoryGigMetaApi(id){
    return axiosInstance().get(`api/seller/categorygigmeta/${id}`);
}