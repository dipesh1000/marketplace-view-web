import {axiosInstance} from "../../utils/AxiosInstance";
import {handleError} from "../apiResponse";

export const fetchChatGigApi = () => {
	return axiosInstance()
		.get(`/api/order/seller/custom_request/gigs`)
		.catch(handleError);
};

export const fetchOfferOptionApi = id => {
	return axiosInstance()
		.get(`/api/order/seller/custom_request/offer/options/${id}`)
		.catch(handleError);
};

export const createOfferApi = data => {
	return axiosInstance()
		.post(`/api/notification/chat/custom_offer`, data)
		.catch(handleError);
};
