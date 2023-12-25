import {axiosInstance} from "../../utils/AxiosInstance";
import {handleError} from "../apiResponse";

export const postSearchApi = data => {
	return axiosInstance()
		.post(`/api/gig/search?page=1`, data)
		.catch(handleError);
};

export const fetchSearchApi = data => {
	return axiosInstance()
		.get(`/api/gig/search/suggestion?search=${data}`)
		.catch(handleError);
};
