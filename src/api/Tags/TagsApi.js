import {axiosInstance} from "../../utils/AxiosInstance";
import {handleError} from "../apiResponse";

export const fetchTagsApi = data => {
	return axiosInstance()
		.get(`/api/gig/search_tags/${data}`)
		.catch(handleError);
};
