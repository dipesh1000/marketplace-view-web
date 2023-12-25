import * as actions from "./Type";

const initialState = {
  isLoading: false,
  chatGig: null,
  offerOption: null
};

export const chatOfferReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_CHATGIG_SUCCESS:
      return { ...state, isLoading: false, chatGig: action.payload.gigs };

    case actions.FETCH_OFFEROPTION_SUCCESS:
      return {...state, isLoading: false, offerOption: action.payload.offeroptions };

    case actions.FETCH_CHATGIG_BEGIN:
    case actions.FETCH_OFFEROPTION_BEGIN:
      return { ...state, isLoading: true };

    case actions.FETCH_CHATGIG_ERROR:
    case actions.FETCH_OFFEROPTION_ERROR:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
