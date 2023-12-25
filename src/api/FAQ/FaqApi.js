import {axiosInstance} from "../../utils/AxiosInstance";
import {handleError} from "../apiResponse";

export function getFaqParentCategories() {
	return axiosInstance()
		.get("/api/faq/categories")
		.catch(handleError);
}

export function getFaqSubCategories(slug) {
	return axiosInstance()
		.get(`/api/faq/category/${slug}`)
		.catch(handleError);
}

export function getFaqSingle(slug) {
	return axiosInstance()
		.get(`/api/faq/question/${slug}`)
		.catch(handleError);
}