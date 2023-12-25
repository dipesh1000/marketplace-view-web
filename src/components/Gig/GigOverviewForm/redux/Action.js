import {
  addGigOverviewApi,
  editGigOverviewApi,
  fetchCategoryApi,
  fetchCategoryGigMetaApi,
  fetchSearchTagApi,
} from "../../../../api/Gig/GigOverviewApi";
import { hideSpinner, showSpinner } from "../../../common/Spinner/redux/Action";
import * as actions from "./Type";
export const addGigOverview = (data, handleHistory) => (dispatch) => {
  dispatch(showSpinner());
  addGigOverviewApi(data).then((res) => {
    handleHistory(res?.data?.data?.gig_slug);
    dispatch(hideSpinner());
  });
};
export const editGigOverview = (data, id, handleHistory) => (dispatch) => {
  dispatch(showSpinner());
  editGigOverviewApi(data, id).then((res) => {
    dispatch(hideSpinner());
    handleHistory(res?.data?.data?.gig_slug);
  });
};

export const fetchCategory = (id) => (dispatch) => {
  dispatch({
    type: actions.CATEGORY_FETCH_BEGIN,
  });

  fetchCategoryApi(id)
    .then((res) => {
      dispatch({
        type: actions.CATEGORY_FETCH_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({ type: actions.CATEGORY_FETCH_ERROR });
      console.log(err);
    });
};
export const clearGigMeta = () => (dispatch) => {
  dispatch({
    type: actions.CLEARGIGMETA,
  });
};
export const fetchCategoryGigMeta = (id) => (dispatch) => {
  dispatch({
    type: actions.CATEGORYGIGMETA_FETCH_BEGIN,
  });

  fetchCategoryGigMetaApi(id)
    .then((res) => {
      dispatch({
        type: actions.CATEGORYGIGMETA_FETCH_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({ type: actions.CATEGORYGIGMETA_FETCH_ERROR });
      console.log(err);
    });
};
export const fetchSearchTag = (id) => (dispatch) => {
  dispatch({
    type: actions.SEARCHTAG_FETCH_BEGIN,
  });

  fetchSearchTagApi(id)
    .then((res) => {
      dispatch({
        type: actions.SEARCHTAG_FETCH_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({ type: actions.SEARCHTAG_FETCH_ERROR });
      console.log(err);
    });
};
