import { axiosInstance } from "../../utils/AxiosInstance";
import { handleError } from "../apiResponse";

export const fetchWishlistApi = () => {
  return axiosInstance().get("/api/user/wishlist").catch(handleError);
};

export const postSellerApi = (data) => {
  return axiosInstance()
    .post("/api/user/seller/wishlist", data)
    .catch(handleError);
};

export const postGigApi = (data) => {
  return axiosInstance()
    .post("/api/user/gig/wishlist", data)
    .catch(handleError);
};
