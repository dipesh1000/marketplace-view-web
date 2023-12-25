import {axiosInstance} from "../../utils/AxiosInstance";
import {handleError, handleResponse} from "../apiResponse";

export const fetchResolutionApi = orderId => {
	return axiosInstance()
		.get(`/api/order/seller/resolution/${orderId}`)
		.catch(handleError);
};

export const submitResolutionApi = (orderId, data) => {
	return axiosInstance()
		.post(`/api/order/seller/resolution/store/${orderId}`, data)
		.then(handleResponse)
		.catch(handleError);
};

export const fetchBuyerResolutionApi = orderId => {
	return axiosInstance()
		.get(`/api/order/resolution/${orderId}`)
		.catch(handleError);
};

export const submitBuyerResolutionApi = (orderId, data) => {
	return axiosInstance()
		.post(`/api/order/resolution/store/${orderId}`, data)
		.then(handleResponse)
		.catch(handleError);
};

export const directCancelOrderBuyerApi = orderId => {
	return axiosInstance()
		.post(`/api/order/resolution/direct-cancel`, {
			order_id: orderId,
			// reason: "Reason...",
		})
		.catch(handleError);
};

export const directCancelOrderSellerApi = orderId => {
	return axiosInstance()
		.post(`/api/order/seller/resolution/direct-cancel`, {
			order_id: orderId,
			// reason: "Reason...",
		})
		.catch(handleError);
};
