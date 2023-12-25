import { axiosInstance } from "../../utils/AxiosInstance";
import { handleError, handleResponse } from "../apiResponse";


export const startChatApi = (user_id) => {
  return axiosInstance()
    .get(`/api/notification/chat/start_message?user_id=${user_id}`)
    .catch(handleError);
};

export const fetchChatListApi = () => {
  return axiosInstance().get("/api/notification/chat/list").catch(handleError);
};

export const fetchUserMessageApi =(data) =>{
  return axiosInstance().post(`/api/notification/chat/all_message`, data).catch(handleError);
}

export const sendChatMessageApi =(data) =>{
  return axiosInstance().post(`/api/notification/chat/send_message`, data).catch(handleError);
}

export const contactSellerApi = (data) =>{
  return axiosInstance().post(`/api/notification/chat/contact_seller`, data).catch(handleError);
}

export const acceptOfferApi = (id) =>{
  return axiosInstance()
    .post(`/api/notification/chat/custom_offer/order/${id}`)
    .then(handleResponse)
    .catch(handleError);
}

export const rejectOfferApi =(data) =>{
  return axiosInstance()
    .post(`/api/notification/chat/custom_offer/action`, data)
    .then(handleResponse)
    .catch(handleError);
}