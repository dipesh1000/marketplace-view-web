import * as actions from "./Type";
import {
  fetchFeedbackBySlugApi,
  fetchGigBySlugApi,
  postReviewStatusApi,
  reportGigIssueApi,
} from "../../../api/GigList/GigListApi";
import { fetchFreelancerReview } from "../../Profile/Freelancer/redux/Action";

export const getSingleGigDetails = (slug) => (dispatch) => {
  dispatch({ type: actions.GIG_DETAILS_LOADING });
  fetchGigBySlugApi(slug)
    .then((res) => {
      dispatch({
        type: actions.GIG_DETAILS_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      dispatch({ type: actions.GIG_DETAILS_ERROR, error: error });
    });
};

export const reportGigIssue = (data, handleClose) => {
  reportGigIssueApi(data).then((res) => {
    handleClose();
  });
};

export const getSingleGigFeedback = (slug, filterData) => (dispatch) => {
  dispatch({ type: actions.GIG_FEEDBACK_LOADING });
  dispatch({ type: actions.UPDATE_FILTER_DATA, payload: filterData });
  fetchFeedbackBySlugApi(slug, filterData)
    .then((res) => {
      dispatch({
        type: actions.GIG_FEEDBACK_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      dispatch({ type: actions.GIG_FEEDBACK_ERROR, error: error });
    });
};

export const postReviewStatus =
  (status, id, slug, filterData, type) => (dispatch) => {
    postReviewStatusApi(status, id).then((res) => {
      // dispatch(getSingleGigFeedback(slug, filterData));
      if (type === "review") {
        dispatch(fetchFreelancerReview(slug));
      }
    });
  };
