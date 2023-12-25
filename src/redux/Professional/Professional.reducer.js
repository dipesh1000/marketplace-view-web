import * as actions from "./Professional.types";

const initialState = {
    isLoading: false,
    skills: [],
    universities: [],
    error: null,
}
export const professionalReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.PROFESSIONAL_LOADING:
            return {
                ...state,
                isLoading: true,
            }

        case actions.PROFESSIONAL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                skills: action.payload.skills,
                universities: action.payload.universities
            } 
        
        case actions.PROFESSIONAL_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state;
    }
}