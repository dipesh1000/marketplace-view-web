import * as actions from "./Auth.type";
import { returnErrors } from "../Error/Error.action";
import { returnSuccess } from "../Success/Success.action";
import {
  userLogin,
  userValidate,
  userRegister,
  userSocialLogin,
  userActivations,
  userForgotPassword,
  userResetPassword,
  userLogout,
} from "../../api/auth/Authapi";
import { closeModal, openModal } from "../Modal/Modal.action";
// load user run every time for token verification
export const loadUser = () => (dispatch) => {
  dispatch({ type: actions.USER_LOADING });
  userValidate()
    .then((res) => {
      dispatch({
        type: actions.USER_LOADED,
        payload: res.data,
      });
    })

    .catch((err) => {
      console.log(err);
      // dispatch(returnErrors(err.response.data, err.response.status));
      // dispatch({
      // 	type: actions.AUTH_ERROR,
      // });
    });
};

export const authError = () => (dispatch) => {
  dispatch({
    type: actions.AUTH_ERROR,
  });
};

// Register User
export const registerUser = (data) => (dispatch) => {
  userRegister(data)
    .then((res) => {
      dispatch(returnSuccess(res.data));
      dispatch(openModal("confimation"));
      dispatch({
        type: actions.REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err?.response?.data,
          err?.response?.status,
          "REGISTER_FAIL"
        )
      );
      dispatch({
        type: actions.REGISTER_FAIL,
      });
    });
};

//User Activation
export const userActivation = (email, token) => (dispatch) => {
  userActivations(email, token)
    .then((res) => {
      dispatch(returnSuccess(res.data));
      dispatch({ type: actions.ACTIVATION_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          actions.REGISTER_FAIL
        )
      );
      dispatch({
        type: actions.REGISTER_FAIL,
      });
    });
};

// Login
export const login =
  (data, handleRole = null) =>
  (dispatch) => {
    localStorage.setItem("data", JSON.stringify(data));
    userLogin(data)
      .then((res) => {
        dispatch(returnSuccess(res.data));
        dispatch(closeModal("login"));
        dispatch({
          type: actions.LOGIN_SUCCESS,
          payload: res.data,
        });
        handleRole && handleRole(res.data.data?.user?.role);
      })
      .catch((err) => {
        //   dispatch(
        //     returnErrors(err?.response?.data, err?.response?.status, "LOGIN_FAIL")
        //   );
        dispatch({
          type: actions.LOGIN_FAIL,
        });
      });
  };

// google login
export const googleLogin = (data) => (dispatch) => {
  userSocialLogin(data)
    .then((res) => {
      dispatch(closeModal("login"));
      dispatch({
        type: actions.LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        returnErrors(err?.response?.data, err?.response?.status, "LOGIN_FAIL")
      );
      dispatch({
        type: actions.LOGIN_FAIL,
      });
    });
};
// facebook login
export const fbLogin = (data) => (dispatch) => {
  userSocialLogin(data)
    .then((res) => {
      dispatch(closeModal("login"));
      dispatch({
        type: actions.LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: actions.LOGIN_FAIL,
      });
    });
};

export const forgot = (data) => (dispatch) => {
  userForgotPassword(data)
    .then((res) => {
      dispatch(openModal("forgetConformation"));
      dispatch(returnSuccess(res.data));
      dispatch({
        type: actions.FORGOT_PASSWORD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          actions.FORGOT_PASSWORD_FAIL
        )
      );
      dispatch({
        type: actions.FORGOT_PASSWORD_FAIL,
      });
    });
};

export const resetPassword = (data) => (dispatch) => {
  userResetPassword(data)
    .then((res) => {
      dispatch(returnSuccess(res.data));
      dispatch({
        type: actions.FORGOT_PASSWORD_RESET_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          actions.FORGOT_PASSWORD_RESET_FAIL
        )
      );
      dispatch({
        type: actions.FORGOT_PASSWORD_RESET_FAIL,
      });
    });
};

// Logout
export const logout = (data, handleHistory) => (dispatch) => {
  userLogout(data)
    .then((res) => {
      dispatch({
        type: actions.LOGOUT_SUCCESS,
      });
      handleHistory();
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.status, actions.LOGOUT_FAIL));
      dispatch({
        type: actions.LOGOUT_FAIL,
      });
    });
};

export const changeRole = (data, handleRoute) => (dispatch) => {
  dispatch({ type: actions.ROLE_CHANGE_SUCCESS, payload: data });
  handleRoute();
};

export const profileUpdateImage = (data) => (dispatch) => {
  dispatch({ type: actions.ROLE_CHANGE_SUCCESS, payload: data });
};

//
