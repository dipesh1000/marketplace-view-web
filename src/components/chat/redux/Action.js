import {
  acceptOfferApi,
  contactSellerApi,
  fetchChatListApi,
  fetchUserMessageApi,
  rejectOfferApi,
  sendChatMessageApi,
  startChatApi,
} from "../../../api/chat/ChatApi";
import { closeModal } from "../../../redux/Modal/Modal.action";
import Store from "../../../redux/store";
import * as actions from "./Type";

export const startChat = (user_id) => (dispatch) => {
  dispatch({
    type: actions.FETCH_STARTCHAT_BEGIN,
  });
  startChatApi(user_id)
    .then((res) => {
      dispatch({
        type: actions.FETCH_STARTCHAT_SUCCESS,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({
        type: actions.FETCH_STARTCHAT_ERROR,
      });
    });
};

export const fetchChatList = () => (dispatch) => {
  dispatch({
    type: actions.FETCH_CHATLIST_BEGIN,
  });
  const store = Store.getState();
  const { user } = store?.auth;
  const userId = user?.id;
  fetchChatListApi()
    .then((res) => {
      dispatch({
        type: actions.FETCH_CHATLIST_SUCCESS,
        payload: { res, userId },
      });
    })
    .catch(() => {
      dispatch({
        type: actions.FETCH_CHATLIST_ERROR,
      });
    });
};

export const fetchUserMessage = (data) => (dispatch) => {
  dispatch({
    type: actions.FETCH_USERMESSAGE_BEGIN,
  });
  fetchUserMessageApi(data)
    .then((res) => {
      dispatch({
        type: actions.FETCH_USERMESSAGE_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch(() => {
      dispatch({
        type: actions.FETCH_USERMESSAGE_ERROR,
      });
    });
};
export const appendMessage = (data) => (dispatch) => {
  fetchUserMessageApi(data).then((res) => {
    dispatch({
      type: actions.APPEND_USERMESSAGE,
      payload: res.data,
    });
  });
};
export const addMessage = (data) => (dispatch) => {
  dispatch({
    type: actions.ADD_USERMESSAGE,
    payload: data.chatMessage,
  });
};

export const addChatList = (data, userId) => (dispatch) => {
  dispatch({
    type: actions.ADD_CHATLIST,
    payload: { data, userId },
  });
};

export const sendChatMessage = (data, chat_room_id) => (dispatch) => {
  sendChatMessageApi(data).then((res) => {
    dispatch(fetchUserMessage({ chat_room_id: chat_room_id, page: 1 }));
  });
};

export const contactSeller = (data) => (dispatch) => {
  contactSellerApi(data).then((res) => {
    dispatch(closeModal());
  });
};

export const changeSeen = (chat_room_id) => (dispatch) => {
  dispatch({
    type: actions.CHANGE_SEEN_USERMESSAGE,
    payload: chat_room_id,
  });
};

export const acceptOffer = (id, handleHistory) => (dispatch) => {
  acceptOfferApi(id).then((res) => {
    handleHistory(res.data.data);
  });
};

export const rejectOffer = (data, chatRoom) => (dispatch) => {
  rejectOfferApi(data).then((res) => {
    dispatch(fetchUserMessage(chatRoom));
  });
};
