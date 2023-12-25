import {axiosInstance} from "../../utils/AxiosInstance";
import { handleError } from "../apiResponse";

export function createPersonalInfo(data) {
    return axiosInstance().post("/api/seller/become-a-seller", data).catch(handleError);
}

export function getProfileInfo(step) {
    return axiosInstance().get(`/api/seller/become-a-seller?step=${step}`).catch(handleError);
}
 
export function getCountryDialCode() {
    return axiosInstance().get("/api/site/country-dial-code");
}

export function numberVerification(data) {
    return axiosInstance().post("/api/seller/verify-phone", data).catch(handleError);
}

export function finalizeSeller(){
    return axiosInstance().post('/api/seller/finalize-seller').catch(handleError)
}

export function fetchProfileAPI(){
    return axiosInstance().get('/api/seller/all-seller-data').catch(handleError)
}
