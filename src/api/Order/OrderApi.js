import {axiosInstance} from "../../utils/AxiosInstance";
import {handleError, handleResponse} from "../apiResponse";

export const fetchOrderApi = (data, days) => {
	return axiosInstance()
		.get(`/api/order/seller?status=${data}&filter_days=${days ? days : null}`)
		.catch(handleError);
};

export const fetchBuyerOrderApi = (data, days) => {
	return axiosInstance()
		.get(`/api/order?status=${data}&filter_days=${days ? days : null}`)
		.catch(handleError);
};

export const fetchOrderStatusApi = () => {
	return axiosInstance()
		.get("/api/order/seller/status")
		.catch(handleError);
};

export const fetchOrderStatusBuyerApi = () => {
	return axiosInstance()
		.get(`/api/order/status`)
		.catch(handleError);
};

export const fetchSingleOrderApi = orderId => {
	return axiosInstance()
		.get(`/api/order/seller/details/${orderId}`)
		.catch(handleError);
};

export const fetchSingleOrderBuyerApi = orderId => {
	return axiosInstance()
		.get(`/api/order/details/${orderId}`)
		.catch(handleError);
};

export const skipOrderRequirementApi = orderId => {
	return axiosInstance()
		.post(`/api/order/seller/skip/requirement/${orderId}`)
		.then(handleResponse)
		.catch(handleError);
};

export const sendOrderMessageApi = (orderId, data) => {
	return axiosInstance()
		.post(`/api/order/seller/send/message/${orderId}`, data)
		.then(handleResponse)
		.catch(handleError);
};

export const sendOrderBuyerMessageApi = (orderId, data) => {
	return axiosInstance()
		.post(`/api/order/send/message/${orderId}`, data)
		.then(handleResponse)
		.catch(handleError);
};

export const sendProgressUpdateApi = (orderId, data) => {
	return axiosInstance()
		.post(`/api/order/seller/progress/update/${orderId}`, data)
		.then(handleResponse)
		.catch(handleError);
};

export const handleResolutionApi = (resolutionId, data) => {
	return axiosInstance()
		.post(`/api/order/seller/resolution/action/${resolutionId}`, data)
		.then(handleResponse)
		.catch(handleError);
};

export const handleResolutionBuyerApi = (resolutionId, data) => {
	return axiosInstance()
		.post(`/api/order/resolution/action/${resolutionId}`, data)
		.then(handleResponse)
		.catch(handleError);
};

export const sendDeliveryApi = (orderId, data) => {
	return axiosInstance()
		.post(`/api/order/seller/delivery/${orderId}`, data)
		.then(handleResponse)
		.catch(handleError);
};

export const sendDeliveryActionApi = (orderId, data) => {
	return axiosInstance()
		.post(`/api/order/delivery/action/${orderId}`, data)
		.then(handleResponse)
		.catch(handleError);
};

export const fetchModifiedOrderApi = resolutionId => {
	return axiosInstance()
		.get(`/api/order/resolution/details/${resolutionId}`)
		.catch(handleError);
};

export const checkRevisionApi = (orderId, data) => {
	return axiosInstance()
		.post(`/api/order/seller/revision/${orderId}`, data)
		.catch(handleError);
};

export const submitRequirementBuyerApi = (orderId, data) => {
	return axiosInstance()
		.post(`/api/order/requirement/${orderId}`, data)
		.then(handleResponse)
		.catch(handleError);
};

export const buyerReviewSubmitApi = (orderId, data) => {
	return axiosInstance()
		.post(`/api/order/feedback/${orderId}`, data)
		.then(handleResponse)
		.catch(handleError);
};

export const sellerReviewSubmitApi = (orderId, data) => {
	return axiosInstance()
		.post(`/api/order/seller/feedback/${orderId}`, data)
		.then(handleResponse)
		.catch(handleError);
};

export const cancelOrderApi = data => {
	return axiosInstance()
		.post(`/api/order/resolution/direct-cancel`, data)
		.then(handleResponse)
		.catch(handleError);
};
