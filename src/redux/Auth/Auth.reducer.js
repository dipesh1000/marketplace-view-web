import * as actions from "./Auth.type";
const initialState = {
  token: localStorage.getItem("token") || "",
  isAuthenticated: false,
  isLoading: false,
  user: null,
  login:
    JSON.parse(localStorage.getItem("data")) ||
    JSON.parse(localStorage.getItem("userData")) ||
    "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_LOADING:
      return {
        ...state,
        isLoading: true,
        token: localStorage.getItem("token"),
        user: JSON.parse(localStorage.getItem("user")),
      };

    case actions.ROLE_CHANGE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actions.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        // user: action.payload.data.user,
      };

    case actions.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.data.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload.data.user));
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: localStorage.getItem("token"),
        user: JSON.parse(localStorage.getItem("user")),
        login: JSON.parse(localStorage.getItem("data")),
      };

    case actions.REGISTER_SUCCESS:
      return state;

    case actions.ACTIVATION_SUCCESS:
      return state;

    case actions.FORGOT_PASSWORD_SUCCESS:
      return state;

    case actions.FORGOT_PASSWORD_RESET_SUCCESS:
      return state;

    case actions.ROLE_CHANGE_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        user: JSON.parse(localStorage.getItem("user")),
      };

    case actions.AUTH_ERROR:
    case actions.REGISTER_FAIL:
    case actions.LOGOUT_SUCCESS:
    case actions.ACTIVATION_FAIL:
    case actions.FORGOT_PASSWORD_FAIL:
    case actions.FORGOT_PASSWORD_RESET_FAIL:
    case actions.LOGIN_FAIL:
      var myItem = localStorage.getItem("data");
      localStorage.clear();
      localStorage.setItem("userData", myItem);

      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case actions.ROLE_CHANGE_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
