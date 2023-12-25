import * as actions from "./Type";

const inititalState = {
  media: null,
  errors: null,
  loading: false,
};

export const gigGalleryReducer = (state = inititalState, action) => {
  switch (action.type) {
    case actions.UPLOAD_MEDIA_BEGIN:
    case actions.DELETE_MEDIA_BEGIN:
    case actions.FETCH_MEDIA_BEGIN:
    case actions.UPDATE_GALLERY_BEGIN:
      return {
        ...state,
        loading: true,
        errors: null,
      };

    case actions.UPLOAD_MEDIA_SUCCESS:
      return { ...state };

    case actions.FETCH_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null,
        media: action.payload,
      };

    case actions.SET_GALLERYFORM_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload?.errors,
      };

    case actions.DELETE_MEDIA_SUCCESS:
      return { ...state, loading: false };

    case actions.UPDATE_GALLERY_SUCCESS:
      return { ...state };

    case actions.DELETE_MEDIA_ERROR:
    case actions.UPLOAD_MEDIA_ERROR:
    case actions.FETCH_MEDIA_ERROR:
    case actions.UPDATE_GALLERY_ERROR:
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
