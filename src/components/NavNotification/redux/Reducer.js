import * as actions from "./Type";

const initialState = {
  loading: false,
  userNotifications: [],
  newMessage: false,
};
export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.NOTIFICATION_FETCH_BEGIN:
      return { ...state, loading: true };

    case actions.NOTIFICATION_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        userNotifications: action.payload.all_notifications,
      };

   
    case actions.NOTIFICATION_FETCH_ERROR:
      return { ...state, loading: false };

    case actions.SHOW_NEW_MESSAGE:
      return { ...state, newMessage: true };

    case actions.CLEAR_NEW_MESSAGE:
      return { ...state, newMessage: false };

    case actions.NOTIFICATION_PUSHER_ADD:
      return { ...state, userNotifications: action.payload };

    default:
      return { ...state };
  }
};
