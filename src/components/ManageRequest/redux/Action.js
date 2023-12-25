import {
  acceptOfferApi,
  changeRequestStatusApi,
  CustomRequestApi,
  deleteCustomRequestApi,
  fetchCustomRequestApi,
  fetchOffersApi,
  removeOfferApi,
} from "../../../api/ManageRequest/ManageRequestapi";
import * as actions from "./Type";

export const customRequest = (data, handleHistory) => (dispatch) => {
  dispatch({
    type: actions.POST_BEGIN,
  });
  CustomRequestApi(data)
    .then((res) => {
      dispatch({
        type: actions.POST_COMPLETE,
      });
      handleHistory();
    })
    .catch(() => {
      dispatch({
        type: actions.POST_COMPLETE,
      });
    });
};

export const fetchCustomRequest = () => (dispatch) => {
  dispatch({
    type: actions.FETCH_CUSTOMREQUEST_BEGIN,
  });
  fetchCustomRequestApi()
    .then((res) => {
      dispatch({
        type: actions.FETCH_CUSTOMREQUEST_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch(() => {
      dispatch({
        type: actions.FETCH_CUSTOMREQUEST_ERROR,
      });
    });
};

export const deleteCustomRequest = (data, handleChangeState) => (dispatch) => {
  handleChangeState(true);
  deleteCustomRequestApi(data)
    .then(() => {
      dispatch(fetchCustomRequest("active"));
      handleChangeState(false);
    })
    .catch(() => {
      handleChangeState(false);
    });
};

export const changeRequestStatus =
  (id, data, handleChangeState) => (dispatch) => {
    handleChangeState(true);
    changeRequestStatusApi(id, data)
      .then(() => {
        dispatch(fetchCustomRequest("active"));
        // handleChangeState(false);
      })
      .catch(() => {
        handleChangeState(false);
      });
  };

export const fetchOffers = (id) => (dispatch) => {
  dispatch({
    type: actions.FETCH_OFFERS_BEGIN,
  });
  fetchOffersApi(id)
    .then((res) => {
      dispatch({
        type: actions.FETCH_OFFERS_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch(() => {
      dispatch({
        type: actions.FETCH_OFFERS_ERROR,
      });
    });
};

export const removeOffer = (id, requestId) => (dispatch) => {
  removeOfferApi(id).then((res) => {
    dispatch(fetchOffers(requestId));
  });
};

export const acceptOffer = (id, handleHistory) => (dispatch) => {
  acceptOfferApi(id).then((res) => {
    handleHistory(res.data.data);
  });
};
