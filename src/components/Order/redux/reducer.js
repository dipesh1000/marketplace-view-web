import * as actions from './type'

const initialState = {
  isLoading: false,
  postLoading: false,
  orderData: null,
  orderRequirement: null,
}

export const checkoutReducer =(state = initialState, action) =>{

  switch(action.type){

    case actions.FETCH_ORDERBYCODE_SUCCESS:
      return {...state, orderData: action.payload.order, isLoading: false}

    case actions.FETCH_ORDERREQUIREMENT_SUCCESS:
      return {
        ...state,
        orderRequirement: action.payload?.gigrequirement,
        isLoading: false,
      };

    case actions.FETCH_ORDERREQUIREMENT_BEGIN:
    case actions.FETCH_ORDERBYCODE_BEGIN:
      return {...state, isLoading: true}
      
    case actions.HANDLE_LOADING_BEGIN:
      return { ...state, postLoading: true };

    case actions.FETCH_ORDERREQUIREMENT_ERROR:
    case actions.FETCH_ORDERBYCODE_ERROR:
      return { ...state, isLoading: false };

    case actions.HANDLE_LOADING_COMPLETE:
      return {...state, postLoading: false}

    default:
      return state
  }

}
