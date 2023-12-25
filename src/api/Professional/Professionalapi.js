import {axiosInstance} from "../../utils/AxiosInstance";

export function getAllSuggestion() {
    return axiosInstance().get("/api/site/profile-suggestion");
}