import * as actions from './Type';

const initialState = {
  isLoading: false,
  resolutions: null,
  postLoading: false
}

export const resolutionReducer =(state = initialState, action) =>{
  switch(action.type){
    case actions.FETCH_RESOLUTION_SUCCESS:
      return {...state, isLoading: false, resolutions: action.payload.data}

    case actions.FETCH_RESOLUTION_BEGIN:
      return {...state, isLoading: true}
    
    case actions.FETCH_RESOLUTION_ERROR:
      return {...state, isLoading: false}

    case actions.HANDLE_POST_BEGIN:
      return {...state, postLoading: true}

    case actions.HANDLE_POST_COMPLETE:
      return {...state, postLoading: false}
    default:
      return state;
  }
}