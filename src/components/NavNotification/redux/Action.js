import {
  fetchUserNotificationsApi,
  markAllReadApi,
} from "../../../api/Notification/NotificationApi";
import Store from "../../../redux/store";
import { fetchChatList } from "../../chat/redux/Action";
import * as actions from "./Type";

export const fetchUserNotifications = () => (dispatch) => {
  dispatch({ type: actions.NOTIFICATION_FETCH_BEGIN });
  fetchUserNotificationsApi()
    .then((res) => {
      dispatch({
        type: actions.NOTIFICATION_FETCH_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({ type: actions.NOTIFICATION_FETCH_ERROR });
    });
};

export const showMessageIcon = () => (dispatch) => {
  dispatch({ type: actions.SHOW_NEW_MESSAGE });
};

export const clearMessageIcon = () => (dispatch) => {
  dispatch({ type: actions.CLEAR_NEW_MESSAGE });
};

export const pusherUserNotifications = (data) => (dispatch) => {
  const storeData = Store.getState();
  const newNotifications = [
    data,
    ...storeData?.notifications?.userNotifications,
  ];
  dispatch({
    type: actions.NOTIFICATION_PUSHER_ADD,
    payload: newNotifications,
  });
  dispatch({ type: actions.SHOW_NEW_MESSAGE });
};

export const pusherUserMessages = (data) => (dispatch) => {
  // const storeData = Store.getState();
  // const newMessages = [
  //   data,
  //   ...storeData?.notifications?.userMessages,
  // ];
  // dispatch({
  //   type: actions.MESSAGE_PUSHER_ADD,
  //   payload: newMessages,
  // });
  // dispatch({ type: actions.SHOW_NEW_MESSAGE });
};

export const markAllRead = () => (dispatch) => {
  markAllReadApi().then((res) => {
    dispatch(fetchChatList());
    dispatch(fetchUserNotifications());
    dispatch(clearMessageIcon());
  });
};
