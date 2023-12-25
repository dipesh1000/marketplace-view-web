import {axiosInstance} from "../../utils/AxiosInstance";

export function getAllCategory() {
    return axiosInstance().get("/api/category/namelist");
}

export function getCategorySlug(slug) {
    return axiosInstance().get(`/api/category/child/${slug}`);
}