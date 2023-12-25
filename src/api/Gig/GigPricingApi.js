import { axiosInstance } from "../../utils/AxiosInstance"
import { handleError, handleResponse } from "../apiResponse";

export const fetchCategoryPackageMetaApi = (id) =>{
       return axiosInstance().get(`/api/seller/categorypackagemeta/${id}`)
       .catch(handleError);
}

export const fetchPackageApi = ()=>{
    return axiosInstance().get(`/api/seller/packages`)
    .catch(handleError);
}

export const updateGigPricingApi = (data,id) =>{
    return axiosInstance().post(`/api/seller/gig/update/${id}`, data)
    .then(handleResponse)
    .catch(handleError);
}

export const fetchPricingLimitApi = () => {
    return axiosInstance().get('/api/seller/gig/limits').catch(handleError)
}