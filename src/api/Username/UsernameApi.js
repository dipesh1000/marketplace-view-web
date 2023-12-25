import { axiosInstance } from "../../utils/AxiosInstance";
import { handleError } from "../apiResponse";

export const fetchUsernameApi = () => {
  return axiosInstance().get("/api/user/profile_data").catch(handleError);
};

export const postUsernameApi = (data) => {
  return axiosInstance()
    .post("/api/user/profile_data/update", data)
    .catch(handleError);
};
