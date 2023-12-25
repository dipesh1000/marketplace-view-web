import {
  fetchGigByCategoryApi,
  fetchGigmetaByCategoryApi,
  fetchSellerDetailsApi,
  fetchServiceTypeByCategoryApi,
} from "../../../api/GigList/GigListApi";
import * as actions from "./Type";

export const fetchGigByCategory = (slug, data, page_no) => (dispatch) => {
  const sellerLanguage = data?.seller_language?.map((seller) => {
    return { value: seller };
  });

  dispatch({
    type: actions.FETCH_GIGlIST_BEGIN,
  });
  fetchGigByCategoryApi(
    slug,
    { ...data, seller_language: sellerLanguage },
    page_no
  )
    .then((res) => {
      dispatch({
        type: actions.FETCH_GIGlIST_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.FETCH_GIGlIST_ERROR,
      });
    });
  dispatch(setFilterData(data));
};

export const fetchGigmetaByCategory = (slug) => (dispatch) => {
  dispatch({
    type: actions.FETCH_GIGMETA_BEGIN,
  });
  fetchGigmetaByCategoryApi(slug)
    .then((res) => {
      dispatch({
        type: actions.FETCH_GIGMETA_SUCCESS,
        payload: res.data.data.categorygigmetas,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.FETCH_GIGMETA_ERROR,
      });
    });
};

export const fetchServiceTypeByCategory = (slug) => (dispatch) => {
  dispatch({
    type: actions.FETCH_SERVICETYPE_BEGIN,
  });
  fetchServiceTypeByCategoryApi(slug)
    .then((res) => {
      dispatch({
        type: actions.FETCH_SERVICETYPE_SUCCESS,
        payload: res.data.data.servicetypes,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.FETCH_SERVICETYPE_ERROR,
      });
    });
};

export const fetchSellerDetails = () => (dispatch) => {
  dispatch({
    type: actions.FETCH_SELLERDETAILS_BEGIN,
  });
  fetchSellerDetailsApi()
    .then((res) => {
      dispatch({
        type: actions.FETCH_SELLERDETAILS_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.FETCH_SELLERDETAILS_ERROR,
      });
    });
};

export const setFilterData = (data) => (dispatch) => {
  dispatch({
    type: actions.SET_FILTERDATA_SUCCESS,
    payload: data,
  });
};
