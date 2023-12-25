import { getAllSuggestion } from "../../api/Professional/Professionalapi";
import * as actions from "./Professional.types";
// import { getAllCountry } from '../../api/Country/Countryapi';

export const getSuggestion = () => (dispatch) => {
  dispatch({ type: actions.PROFESSIONAL_LOADING });
  getAllSuggestion()
    .then((res) => {
      dispatch({
        type: actions.PROFESSIONAL_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: actions.PROFESSIONAL_ERROR, error: error });
    });
};
