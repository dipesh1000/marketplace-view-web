import * as actions from "./Category.types";
import {
  getAllCategory,
  getCategorySlug,
} from "../../api/category/Categoryapi";

export const getCategoryList = () => (dispatch) => {
  dispatch({ type: actions.CATEGORY_LOADING });
  getAllCategory()
    .then((res) => {
      dispatch({
        type: actions.CATEGORY_SUCCESS,
        payload: res.data.data.categories,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: actions.CATEGORY_ERROR, error: error });
    });
};
export const getCategoryBySlug = (slug) => (dispatch) => {
  dispatch({ type: actions.CATEGORY_SLUG_LOADING });
  getCategorySlug(slug)
    .then((res) => {
      dispatch({
        type: actions.CATEGORY_SLUG_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      dispatch({ type: actions.CATEGORY_ERROR, error: error });
    });
};
