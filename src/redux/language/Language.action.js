import * as actions from "./Language.types";
import { getAllLanguage } from "../../api/language/Languageapi";

export const getLanguageList = () => (dispatch) => {
  dispatch({ type: actions.LANGUAGE_LOADING });
  getAllLanguage()
    .then((res) => {
      dispatch({
        type: actions.LANGUAGE_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: actions.LANGUAGE_ERROR, error: error });
    });
};
