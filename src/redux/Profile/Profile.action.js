import * as actions from "./Profile.types";
import {
  createPersonalInfo,
  fetchProfileAPI,
  finalizeSeller,
  getCountryDialCode,
  getProfileInfo,
  numberVerification,
} from "../../api/profile/Profileapi";
import { returnSuccess } from "../Success/Success.action";
import { changeRole } from "../Auth/Auth.action";
import { openModal } from "../Modal/Modal.action";
import { profileFetchGigAPI } from "../../api/Gig/GigApi";

export const addPersonalInfo =
  (
    data,
    actionSuccess = null,
    handleRoute = null,
    handleProfileUpdate = null
  ) =>
  (dispatch) => {
    dispatch({
      type: actions.POST_ACTION_BEGIN,
    });
    createPersonalInfo(data)
      .then((res) => {
        dispatch({
          type: actions.POST_ACTION_COMPLETE,
        });
        dispatch(returnSuccess(res.data));
        if (actionSuccess) actionSuccess();
        // dispatch(getProfileInfoStep(data.get("step")))
        dispatch({
          type: actions.FORM_ACTION_SAVE,
        });
        if (handleRoute) handleRoute();
        if (handleProfileUpdate) handleProfileUpdate(res.data.data);
      })
      .catch((error) => {
        dispatch({
          type: actions.POST_ACTION_COMPLETE,
        });
        dispatch({ type: actions.PERSONAL_INFO_ERROR, error: error });
      });
  };
export const getProfileInfoStep = (step) => (dispatch) => {
  dispatch({ type: actions.PERSONAL_INFO_LOADING });
  getProfileInfo(step)
    .then((res) => {
      dispatch({
        type: actions.PERSONAL_INFO_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: actions.PERSONAL_INFO_ERROR, error: error });
    });
};

export const getCountryDial = () => (dispatch) => {
  dispatch({ type: actions.COUNTRY_CODE_LOADING });
  getCountryDialCode()
    .then((res) => {
      dispatch({
        type: actions.COUNTRY_CODE_SUCCESS,
        payload: res.data.data.countries,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: actions.COUNTRY_CODE_ERROR, error: error });
    });
};

export const phoneNumberVerification =
  (data, actionSuccess = null) =>
  (dispatch) => {
    dispatch({ type: actions.PHONE_NUMBER_VERIFICATION_LOADING });
    numberVerification(data)
      .then((res) => {
        if (actionSuccess) {
          dispatch(getProfileInfoStep("phone_verification"));
          dispatch(openModal("SellerComplete"));
        }
        dispatch(returnSuccess(res.data));
        dispatch({
          type: actions.PHONE_NUMBER_VERIFICATION_SUCCESS,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: actions.PHONE_NUMBER_VERIFICATION_ERROR,
          error: error,
        });
      });
  };

export const profileSuccess =
  (handleRoute = null) =>
  (dispatch) => {
    dispatch({ type: actions.PROFILE_COMPLETE_LOADING });
    finalizeSeller()
      .then((res) => {
        dispatch(changeRole(res.data.data, handleRoute));
        dispatch(returnSuccess(res.data));
        dispatch({
          type: actions.PROFILE_COMPLETE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: actions.PROFILE_COMPLETE_ERROR,
        });
      });
  };

export const profileFetch = () => (dispatch) => {
  dispatch({ type: actions.PROFILE_FETCH_LOADING });
  fetchProfileAPI()
    .then((res) => {
      dispatch({
        type: actions.PROFILE_FETCH_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: actions.PROFILE_FETCH_ERROR,
      });
    });
};

export const profileGigFetch = () => (dispatch) => {
  dispatch({ type: actions.PROFILEGIG_FETCH_LOADING });
  profileFetchGigAPI()
    .then((res) => {
      dispatch({
        type: actions.PROFILEGIG_FETCH_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: actions.PROFILEGIG_FETCH_ERROR,
      });
    });
};
