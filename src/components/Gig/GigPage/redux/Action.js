import {
  deleteGigApi,
  fetchGigApi,
  fetchGigStatusApi,
  fetchSingleGigApi,
} from "../../../../api/Gig/GigApi";
import * as actions from "./Type";

export const fetchGigs = (days) => (dispatch) => {
  dispatch({
    type: actions.GIG_FETCH_BEGIN,
  });
  fetchGigApi(days)
    .then((res) => {
      dispatch({
        type: actions.GIG_FETCH_SUCCESS,
        payload: res.data.data.gigs,
      });
    })
    .catch(() => {
      dispatch({
        type: actions.GIG_FETCH_ERROR,
      });
    });
};
export const fetchGigStatus = () => (dispatch) => {
  dispatch({
    type: actions.GIGSTATUS_FETCH_BEGIN,
  });
  fetchGigStatusApi()
    .then((res) => {
      dispatch({
        type: actions.GIGSTATUS_FETCH_SUCCESS,
        payload: res.data.data.gigstatus,
      });
    })
    .catch(() => {
      dispatch({
        type: actions.GIGSTATUS_FETCH_ERROR,
      });
    });
};
export const fetchsingleGig = (slug) => (dispatch) => {
  dispatch({
    type: actions.SINGLEGIG_FETCH_BEGIN,
  });
  fetchSingleGigApi(slug)
    .then((res) => {
      dispatch({
        type: actions.SINGLEGIG_FETCH_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch(() => {
      dispatch({
        type: actions.SINGLEGIG_FETCH_ERROR,
      });
    });
};

export const deleteGig = (id) => (dispatch) => {
  dispatch({
    type: actions.GIG_DELETE_BEGIN,
  });
  deleteGigApi(id)
    .then((res) => {
      dispatch(fetchGigs());
    })
    .catch((err) => {
      dispatch({
        type: actions.GIG_DELETE_ERROR,
      });
    });
};
