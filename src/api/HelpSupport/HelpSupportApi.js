import {axiosInstance} from "../../utils/AxiosInstance";
import {handleError} from "../apiResponse";

export function getHelpInfo() {
	return axiosInstance()
		.get("/api/help_support")
		.catch(handleError);
}

export function postHelpInfo(data) {
	return axiosInstance()
		.post("/api/help_support", data)
		.catch(handleError);
}
