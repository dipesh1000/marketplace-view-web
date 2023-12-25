import {
  createOfferApi,
  fetchChatGigApi,
  fetchOfferOptionApi,
} from "../../../../api/chatoffer/ChatOfferApi";
import { closeModal } from "../../../../redux/Modal/Modal.action";
import { fetchUserMessage } from "../../redux/Action";
import * as actions from "./Type";

export const fetchChatGig = () => (dispatch) => {
  dispatch({
    type: actions.FETCH_CHATGIG_BEGIN,
  });
  fetchChatGigApi()
    .then((res) => {
      dispatch({
        type: actions.FETCH_CHATGIG_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch(() => {
      dispatch({
        type: actions.FETCH_CHATGIG_ERROR,
      });
    });
};

export const fetchOfferOption = (id) => (dispatch) => {
  dispatch({
    type: actions.FETCH_OFFEROPTION_BEGIN,
  });
  fetchOfferOptionApi(id)
    .then((res) => {
      dispatch({
        type: actions.FETCH_OFFEROPTION_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch(() => {
      dispatch({
        type: actions.FETCH_OFFEROPTION_ERROR,
      });
    });
};

export const createOffer =(data, chatRoom)=>(dispatch)=>{
  createOfferApi(data).then((res)=>{
    dispatch(closeModal());
    dispatch(fetchUserMessage({ chat_room_id: chatRoom, page: 1 }));
  });
} 
