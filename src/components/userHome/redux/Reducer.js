import * as actions from "./Type";

const initialState = {
    isLoading: false,
    data: [],
    error: null,
}
export const tempGigList = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_TEMP_GIG_LOADING:
            return {
                ...state,
                isLoading: true,
            }

        case actions.FETCH_TEMP_GIG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            } 
        
        case actions.FETCH_TEMP_GIG_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state;
    }
}