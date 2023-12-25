import {axiosInstance} from "../../utils/AxiosInstance";
import {handleError} from "../apiResponse";

export const fetchBuyerRequestApi = () => {
	return axiosInstance()
		.get("/api/order/seller/custom_request")
		.catch(handleError);
};

export const fetchSellerOfferApi = () => {
	return axiosInstance()
		.get("/api/order/seller/custom_request/sent/offers")
		.catch(handleError);
};

export const removeRequestApi = data => {
	return axiosInstance().post("/api/order/seller/custom_request/remove", data);
};
