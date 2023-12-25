import {axiosInstance} from "../../utils/AxiosInstance";

export function getAllLanguage() {
    return axiosInstance().get("/api/site/language-proficiency");
}