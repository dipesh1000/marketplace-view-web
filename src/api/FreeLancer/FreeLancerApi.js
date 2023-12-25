import { axiosInstance } from "../../utils/AxiosInstance";
import { handleError } from "../apiResponse";

export function getFreelancerApi(user) {
  return axiosInstance().get(`/api/seller/public-mode/${user}`);
  // .catch(handleError);
}

export function getFreelancerReview(user, filterData) {
  return axiosInstance()
    .get(
      `/api/seller/public-mode/review-as-seller/${user}?sort_by=${
        filterData ? filterData?.sort_by : "most_relevant"
      }`
    )
    .catch(handleError);
}
