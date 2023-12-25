import * as actions from "./Type";

const initialState = {
  loading: false,
  gig: null,
  gigStatus: null,
  singleGig: null,
  gigSteps: null
};
 export const gigReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GIG_FETCH_SUCCESS:
      return { ...state, gig: action.payload, loading: false };
    case actions.GIGSTATUS_FETCH_SUCCESS:
      return { ...state, gigStatus: action.payload, loading: false };
    case actions.SINGLEGIG_FETCH_SUCCESS:
      return { ...state, singleGig: action.payload?.gig, gigSteps: action.payload?.gig_steps, loading: false };
      
      case actions.SINGLEGIG_FETCH_BEGIN:
        return {...state, singleGig: null,  loading: true};
        
        case actions.GIG_FETCH_BEGIN:
        case actions.GIG_DELETE_BEGIN:
        case actions.GIGSTATUS_FETCH_BEGIN:
            return { ...state, loading: true };
            
    case actions.GIG_DELETE_SUCCESS:
    case actions.GIG_DELETE_ERROR:
    case actions.GIG_FETCH_ERROR:
    case actions.GIGSTATUS_FETCH_ERROR:
    case actions.SINGLEGIG_FETCH_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};

