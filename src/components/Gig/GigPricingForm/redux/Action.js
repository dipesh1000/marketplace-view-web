import {
  fetchCategoryPackageMetaApi,
  fetchPackageApi,
  fetchPricingLimitApi,
  updateGigPricingApi,
} from "../../../../api/Gig/GigPricingApi";
import { hideSpinner, showSpinner } from "../../../common/Spinner/redux/Action";
import * as actions from "./Type";

export const updateGigPricing = (data, id, handleHistory) => (dispatch) => {
  dispatch(showSpinner());
  updateGigPricingApi(data, id).then((res) => {
    handleHistory();
    dispatch(hideSpinner());
  });
};

export const fetchCategoryPackageMeta = (id) => (dispatch) => {
  dispatch({
    type: actions.CATEGORYPACKAGEMETA_FETCH_BEGIN,
  });

  fetchCategoryPackageMetaApi(id)
    .then((res) => {
      dispatch({
        type: actions.CATEGORYPACKAGEMETA_FETCH_SUCCESS,
        payload: res.data.data.categorypackagemetas,
      });
    })
    .catch((err) => {
      dispatch({ type: actions.CATEGORYPACKAGEMETA_FETCH_ERROR });
      console.log(err);
    });
};

export const fetchPackages = () => (dispatch) => {
  dispatch({
    type: actions.PACKAGE_FETCH_BEGIN,
  });
  fetchPackageApi()
    .then((res) =>
      dispatch({
        type: actions.PACKAGE_FETCH_SUCCESS,
        payload: res.data.data.gigstatus,
      })
    )
    .catch((err) => {
      dispatch({
        type: actions.PACKAGE_FETCH_ERROR,
      });
    });
};

export const fetchPricingLimit = () => (dispatch) => {
  dispatch({
    type: actions.PRICELIMIT_FETCH_BEGIN,
  });
  fetchPricingLimitApi()
    .then((res) =>
      dispatch({
        type: actions.PRICELIMIT_FETCH_SUCCESS,
        payload: res.data.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: actions.PRICELIMIT_FETCH_ERROR,
      });
    });
};
