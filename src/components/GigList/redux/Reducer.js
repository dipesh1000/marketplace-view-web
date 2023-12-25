import * as actions from "./Type";

const initialState = {
  loading: false,
  gigList: null,
  gig_meta: null,
  service_types: null,
  seller_details: null,
  filter_data: null,
  thiscategory: null
};

export const gigListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_GIGlIST_BEGIN:
    case actions.FETCH_SERVICETYPE_BEGIN:
    case actions.FETCH_SELLERDETAILS_BEGIN:
    case actions.FETCH_GIGMETA_BEGIN:
      return { ...state, loading: true };

    case actions.FETCH_GIGlIST_SUCCESS:
      return {
        ...state,
        loading: false,
        gigList: action.payload?.gigs,
        thiscategory: action.payload?.thiscategory,
      };

    case actions.FETCH_GIGMETA_SUCCESS:
      return { ...state, loading: false, gig_meta: action.payload };

    case actions.FETCH_SELLERDETAILS_SUCCESS:
      return { ...state, loading: false, seller_details: action.payload };

    case actions.FETCH_SERVICETYPE_SUCCESS:
      return { ...state, loading: false, service_types: action.payload };

    case actions.SET_FILTERDATA_SUCCESS:
      return {...state, filter_data: action.payload};

    case actions.FETCH_SERVICETYPE_ERROR:
    case actions.FETCH_SELLERDETAILS_ERROR:
    case actions.FETCH_GIGMETA_ERROR:
    case actions.FETCH_GIGlIST_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
};
