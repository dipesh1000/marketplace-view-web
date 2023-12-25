import * as actions from './Type';

const initialState = {
  isLoading: false,
  buyerRequest: null,
  sellerOffer: null,
  postLoading: false,
}

export const buyerRequestReducer =(state = initialState, action)=>{

  switch(action.type){

    case actions.FETCH_BUYERREQUEST_SUCCESS:
      return {...state, isLoading: false, buyerRequest: action.payload.custom_requests}

    case actions.FETCH_SENTOFFER_SUCCESS:
      return { ...state, isLoading: false, sellerOffer: action.payload.offers};

    case actions.FETCH_SENTOFFER_BEGIN:
    case actions.FETCH_BUYERREQUEST_BEGIN:
      return {...state, isLoading: true}

    case actions.FETCH_SENTOFFER_ERROR:
    case actions.FETCH_BUYERREQUEST_ERROR:
      return {...state, isLoading: false}

    case actions.POST_COMPLETE:
      return {...state, postLoading: false}

    case actions.POST_BEGIN:
      return {...state, postLoading: true}
    default:
      return state;
  }
}