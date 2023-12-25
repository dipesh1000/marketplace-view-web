import {
  deleteGigGalleryApi,
  getMediaApi,
  updateGigGalleryApi,
  uploadMediaApi,
} from "../../../../api/Gig/GigGalleryApi";
import * as actions from "./Type";

export const getMedia = (slug) => (dispatch) => {
  dispatch({ type: actions.FETCH_MEDIA_BEGIN });
  getMediaApi(slug)
    .then((res) => {
      dispatch({
        type: actions.FETCH_MEDIA_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({ type: actions.FETCH_MEDIA_ERROR });
    });
};

export const updateGigGallery = (data, id, handleHistory) => (dispatch) => {
  dispatch({ type: actions.UPDATE_GALLERY_BEGIN });
  updateGigGalleryApi(data, id)
    .then((res) => {
      dispatch({ type: actions.UPDATE_GALLERY_SUCCESS });
      handleHistory();
    })
    .catch((err) => {
      dispatch({ type: actions.UPDATE_GALLERY_ERROR });
    });
};

export const deleteGallery =
  (data, id, loadGigMedia = null) =>
  (dispatch) => {
    dispatch({ type: actions.DELETE_MEDIA_BEGIN });
    deleteGigGalleryApi(data, id)
      .then((res) => {
        loadGigMedia && loadGigMedia();
        dispatch({ type: actions.DELETE_MEDIA_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: actions.DELETE_MEDIA_ERROR });
      });
  };

export const uploadMedia = (data, loadGigMedia) => (dispatch) => {
  dispatch({ type: actions.UPLOAD_MEDIA_BEGIN });
  uploadMediaApi(data)
    .then((res) => {
      loadGigMedia();
    })
    .catch((err) => {
      dispatch({ type: actions.UPLOAD_MEDIA_ERROR });
      err.response?.data?.type === "validation" &&
        dispatch({
          type: actions.SET_GALLERYFORM_ERRORS,
          payload: err.response.data,
        });
    });
};
