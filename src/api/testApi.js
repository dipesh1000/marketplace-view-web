import { axiosInstance } from "../utils/AxiosInstance"
import { handleError } from "./apiResponse"

export const testApi = () =>{
 return axiosInstance().get('/api/seller/gig/media/download').catch(handleError);
}