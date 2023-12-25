import * as actions from "./Country.types";

const initialState = {
    isLoading: false,
    data: [],
    error: null,
}
export const CountryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.COUNTRY_LOADING:
            return {
                ...state,
                isLoading: true,
            }

        case actions.COUNTRY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            } 
        
        case actions.COUNTRY_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state;
    }
}