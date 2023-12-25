import * as actions from "./Type";

const initialState = {
  isLoading: false,
  siteSetting: null,
};

export const siteSettingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_SITESETTING_SUCCESS:
      return { ...state, siteSetting: action.payload, isLoading: false };

    case actions.FETCH_SITESETTING_BEGIN:
      return { ...state, isLoading: true };

    case actions.FETCH_SITESETTING_ERROR:
      return { ...state, isLoading: false };

    default:
        return state;
  }
};
