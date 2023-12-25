import {axiosInstance} from "../../utils/AxiosInstance";
import {handleError, handleResponse} from "../apiResponse";

export const getMediaApi = slug => {
	return axiosInstance()
		.get(`/api/seller/gig/getMedia/${slug}`)
		.catch(handleError);
};

export const updateGigGalleryApi = (data, id) => {
	return axiosInstance()
		.post(`/api/seller/gig/update/${id}`, data)
		.then(handleResponse)
		.catch(handleError);
};

export const uploadMediaApi = data => {
	return axiosInstance()
		.post(`/api/seller/gig/media/store`, data)
		.then(handleResponse)
		.catch(handleError);
};

export const deleteGigGalleryApi = (data, id) => {
	return axiosInstance()
		.post(`/api/seller/gig/media/delete/${id}`, data)
		.then(handleResponse)
		.catch(handleError);
};
