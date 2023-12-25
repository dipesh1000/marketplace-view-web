import * as actions from "./Type";

const initialState = {
  loading: false,
  allPackages: null,
  categoryPackageMeta: null,
  priceLimit: null,
};

export const gigPricingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CATEGORYPACKAGEMETA_FETCH_SUCCESS:
      return {
        ...state,
        categoryPackageMeta: action.payload,
        loading: false,      };
    case actions.PACKAGE_FETCH_SUCCESS:
      return {
        ...state,
        allPackages: action.payload,
        loading: false,
      };
    
    case actions.PRICELIMIT_FETCH_SUCCESS:
      return {
        ...state,
        priceLimit: action.payload,
        loading:false,
      }

    case actions.CATEGORYPACKAGEMETA_FETCH_BEGIN:
    case actions.PACKAGE_FETCH_BEGIN:
    case actions.PRICELIMIT_FETCH_BEGIN:
      return { ...state, loading: true };

    case actions.CATEGORYPACKAGEMETA_FETCH_ERROR:
    case actions.PACKAGE_FETCH_ERROR:
    case actions.PRICELIMIT_FETCH_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};
