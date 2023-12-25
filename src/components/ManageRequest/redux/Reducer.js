import * as actions from "./Type";

const initialState = {
  isLoading: false,
  customRequest: null,
  offers: null
};

export const manageRequestReducer = (state = initialState, action) => {
  switch(action.type){
    case actions.FETCH_CUSTOMREQUEST_SUCCESS: 
      return {
        ...state,
        isLoading: false,
        customRequest: action.payload.custom_requests,
      };
    case actions.FETCH_OFFERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        offers:  action.payload.offers
      }
    
    case actions.FETCH_OFFERS_BEGIN:
    case actions.FETCH_CUSTOMREQUEST_BEGIN:
      return {...state, isLoading: true}

    case actions.FETCH_OFFERS_ERROR:
    case actions.FETCH_CUSTOMREQUEST_ERROR:
      return {...state, isLoading:  false}

    default:
      return state;
  }
};
