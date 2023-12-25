import * as actions from "./Type";

const initialState = {
  isLoading: false,
  usernameLoading: false,
  deactivationStatus: null,
  deactivationLoading: false,
  password: null,
  username: null,
};

export const usernameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.POST_PASSWORD_SUCCESS:
      return { ...state, isLoading: false };
    case actions.POST_USERNAME_SUCCESS:
      return { ...state, usernameLoading: false };
    case actions.POST_DEACTIVATION_SUCCESS:
      return {
        ...state,
        deactivationLoading: false,
        deactivationStatus: action.payload.status,
      };
    case actions.FETCH_USERNAME_SUCCESS:
      return { ...state, username: action.payload, isLoading: false };

    case actions.POST_USERNAME_BEGIN:
      return { ...state, usernameLoading: true };
    case actions.POST_DEACTIVATION_BEGIN:
      return { ...state, deactivationLoading: true };

    case actions.FETCH_USERNAME_BEGIN:
      return { ...state, isLoading: true };

    case actions.POST_PASSWORD_ERROR:
      return { ...state, isLoading: false };
    case actions.POST_USERNAME_ERROR:
    case actions.FETCH_USERNAME_ERROR:
      return { ...state, usernameLoading: false, isLoading: false };

    case actions.POST_DEACTIVATION_ERROR:
      return { ...state, deactivationLoading: false };

    default:
      return state;
  }
};
