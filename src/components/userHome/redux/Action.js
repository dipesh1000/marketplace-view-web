import * as actions from "./Type";
import { fetchtempGigListApi } from "../../../api/GigList/GigListApi";

export const getTempGigList = () => (dispatch) => {
  dispatch({ type: actions.FETCH_TEMP_GIG_LOADING });
  fetchtempGigListApi()
    .then((res) => {
      dispatch({
        type: actions.FETCH_TEMP_GIG_SUCCESS,
        payload: res.data.data.gigs,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: actions.FETCH_TEMP_GIG_ERROR, error: error });
    });
};
