import { fetchBuyerRequestApi, fetchSellerOfferApi, removeRequestApi } from "../../../api/buyerRequest/BuyerRequestApi";
import * as actions from "./Type";

export const fetchBuyerRequest = () => (dispatch) => {
  dispatch({
    type: actions.FETCH_BUYERREQUEST_BEGIN,
  });

  fetchBuyerRequestApi().then((res) => {
    dispatch({
      type: actions.FETCH_BUYERREQUEST_SUCCESS,
      payload: res.data.data,
    });
  }).catch(()=>{
    dispatch({
      type: actions.FETCH_BUYERREQUEST_ERROR
    })
  })
};

export const fetchSellerOffer = () => (dispatch) => {
  dispatch({
    type: actions.FETCH_SENTOFFER_BEGIN
  })

  fetchSellerOfferApi().then((res)=>{
    dispatch({
      type: actions.FETCH_SENTOFFER_SUCCESS,
      payload: res.data.data
    })
  }).catch(()=>{
    dispatch({
      type: actions.FETCH_SENTOFFER_ERROR
    })
  })
};

export const removeRequest =(data)=>(dispatch)=>{
  dispatch({
    type: actions.POST_BEGIN
  })
  removeRequestApi(data).then((res)=>{
    dispatch({
      type: actions.POST_COMPLETE
    })
    dispatch(fetchBuyerRequest())
  }).catch(()=>{
    dispatch({
      type: actions.POST_COMPLETE
    })
  })
}