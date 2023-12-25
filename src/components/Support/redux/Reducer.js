import * as actions from "./Type";

const initialState = {
	isLoading: false,
	faq: null
};

export const faqReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.FETCH_FAQ_PARENT_BEGIN:
         case actions.FETCH_FAQ_CHILD_BEGIN:
            case actions.FETCH_FAQ_SINGLE_BEGIN:
			return {...state, isLoading: true};
		case actions.FETCH_FAQ_PARENT_SUCCESS:
         case actions.FETCH_FAQ_CHILD_SUCCESS:
            case actions.FETCH_FAQ_SINGLE_SUCCESS:
			return {...state, faq: action.payload, isLoading: false};
		case actions.FETCH_FAQ_PARENT_ERROR:
         case actions.FETCH_FAQ_CHILD_ERROR:
            case actions.FETCH_FAQ_SINGLE_ERROR:
			return {...state, isLoading: false};
         
		default:
			return state;
	}
};
