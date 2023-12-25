import { axiosInstance } from "../../utils/AxiosInstance";
import { handleError, handleResponse } from "../apiResponse";

export function editProfileInfo(data) {
  return axiosInstance()
    .post("/api/user/update-profile", data)
    .then(handleResponse)
    .catch(handleError);
}
