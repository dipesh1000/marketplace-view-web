import {
  postDeactivationApi,
  postPasswordApi,
} from "../../../api/SiteSetting/SiteSettingApi";
import {
  fetchUsernameApi,
  postUsernameApi,
} from "../../../api/Username/UsernameApi";
import { returnSuccess } from "../../../redux/Success/Success.action";
import { profileSuccess } from "../../LoggedInProfile/EditProfile/redux/Action";
import * as actions from "./Type";

export const postPasswordInfo = (data) => (dispatch) => {
  postPasswordApi(data)
    .then((res) => {
      dispatch({
        type: actions.POST_PASSWORD_SUCCESS,
      });
      dispatch(returnSuccess(res.data));
    })
    .catch((err) =>
      dispatch({
        type: actions.POST_PASSWORD_ERROR,
      })
    );
};

export const fetchUsername = () => (dispatch) => {
  dispatch({
    type: actions.FETCH_USERNAME_BEGIN,
  });
  fetchUsernameApi()
    .then((res) => {
      dispatch({
        type: actions.FETCH_USERNAME_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: actions.FETCH_USERNAME_ERROR,
      })
    );
};

export const postUsername = (data) => (dispatch) => {
  dispatch({
    type: actions.POST_USERNAME_BEGIN,
  });
  postUsernameApi(data)
    .then((res) => {
      dispatch({
        type: actions.POST_USERNAME_SUCCESS,
        payload: res.data.data,
      });
      dispatch(fetchUsername());
      dispatch(profileSuccess());
    })
    .catch((err) =>
      dispatch({
        type: actions.POST_USERNAME_ERROR,
      })
    );
};

export const postDeactivation = (data) => (dispatch) => {
  dispatch({
    type: actions.POST_DEACTIVATION_BEGIN,
  });
  postDeactivationApi(data)
    .then((res) => {
      dispatch({
        type: actions.POST_DEACTIVATION_SUCCESS,
        payload: data,
      });
    })
    .catch((err) =>
      dispatch({
        type: actions.POST_DEACTIVATION_ERROR,
      })
    );
};
