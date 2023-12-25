import {axiosInstance} from "../../utils/AxiosInstance";

export function getAllCountry() {
    return axiosInstance().get("/api/site/country-list");
}