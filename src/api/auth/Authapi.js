import { axiosInstance } from "../../utils/AxiosInstance";
import { handleError } from "../apiResponse";

export function userLogin(data) {
  return (
    axiosInstance()
      .post("/api/user/login", data)
      // .then(handleResponse)
      .catch(handleError)
  );
}

export function userValidate() {
  return axiosInstance().get("/api/user/validate");
  // .then(handleResponse)
  // .catch(handleError);
}

export function userRegister(data) {
  return axiosInstance().post("/api/user/register", data);
  // .then(handleResponse)
  // .catch(handleError);
}

export function userActivations(email, token) {
  return axiosInstance()
    .post(`api/user/verify`, { email: email, token: token })
    .then()
    .catch();
}

export function userSocialLogin(data) {
  return axiosInstance().post("/api/user/social-login", data).then().catch();
}

export function userForgotPassword(data) {
  return axiosInstance().post("/api/user/forgot-password", data);
  // .then(handleResponse)
  // .catch(handleError);
}

export function userResetPassword(data) {
  return axiosInstance().post("/api/user/reset-password", data);
  // .then(handleResponse)
  // .catch(handleError)
}

export function userLogout(data) {
  return axiosInstance().post("/api/user/logout", data);
  // .then(handleResponse)
  // .catch(handleError)
}
