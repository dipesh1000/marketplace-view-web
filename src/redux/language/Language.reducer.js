import * as actions from "./Language.types";

const initialState = {
    isLoading: false,
    proficiency: [],
    language: [],
    error: null,
}
export const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LANGUAGE_LOADING:
            return {
                ...state,
                isLoading: true,
            }

        case actions.LANGUAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                language: action.payload.languages,
                proficiency: action.payload.proficiency
            } 
        
        case actions.LANGUAGE_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state;
    }
}