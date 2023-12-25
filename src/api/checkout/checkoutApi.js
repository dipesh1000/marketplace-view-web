import {axiosInstance} from "../../utils/AxiosInstance";
import {handleError, handleResponse} from "../apiResponse";

export const sendCheckoutDataApi = data => {
	return axiosInstance()
		.post("/api/order/store", data)
		.then(handleResponse)
		.catch(handleError);
};

export const getOrdeByCodeApi = orderCode => {
	return axiosInstance()
		.get(`/api/order/summary/${orderCode}`)
		.catch(handleError);
};

export const getSellerOrderByCodeApi = orderCode => {
	return axiosInstance()
		.get(`/api/order/seller/summary/${orderCode}`)
		.catch(handleError);
};

export const getOrderRequirementApi = slug => {
	return axiosInstance()
		.get(`/api/order/gig/requirement/${slug}`)
		.catch(handleError);
};

export const submitRequirementApi = (orderId, data) => {
	return axiosInstance()
		.post(`/api/order/requirement/${orderId}`, data)
		.then(handleResponse)
		.catch(handleError);
};
