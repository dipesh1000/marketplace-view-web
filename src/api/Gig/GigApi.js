import {axiosInstance} from "../../utils/AxiosInstance";
import {handleError, handleResponse} from "../apiResponse";

export const fetchGigApi = days => {
	return axiosInstance()
		.get(`/api/seller/gigs?filter_days=${days ? days : null}`)
		.catch(handleError);
};

export const fetchGigStatusApi = () => {
	return axiosInstance()
		.get("/api/seller/gig/status")
		.catch(handleError);
};

export function fetchSingleGigApi(slug) {
	return axiosInstance()
		.get(`/api/seller/gig/show/${slug}`)
		.catch(handleError);
}

export function deleteGigApi(id) {
	return axiosInstance()
		.post(`/api/seller/gig/delete/${id}`)
		.then(handleResponse)
		.catch(handleError);
}

export const profileFetchGigAPI = () => {
	return axiosInstance()
		.get("/api/seller/gigs")
		.catch(handleError);
};
