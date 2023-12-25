import {axiosInstance} from "../../utils/AxiosInstance";

export const fetchUserNotificationsApi = () => {
	return axiosInstance().get("/api/notification/user");
};

export const markAllReadApi = () => {
	return axiosInstance().get("/api/notification/mark_all_read");
};
