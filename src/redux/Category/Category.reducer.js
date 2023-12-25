import * as actions from "./Category.types";

const initialState = {
    isLoading: false,
    data: [],
    thiscategory: null,
    error: null,
    child: null
}
export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CATEGORY_LOADING:
        case actions.CATEGORY_SLUG_LOADING:
            return {
                ...state,
                isLoading: true,
            }

        case actions.CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
               
            } 
        case actions.CATEGORY_SLUG_SUCCESS:
            return {
              ...state,
              isLoading: false,
              child: action.payload.categories,
              thiscategory: action.payload?.thiscategory,
            }; 
        
        case actions.CATEGORY_ERROR:
        case actions.CATEGORY_SLUG_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state;
    }
}