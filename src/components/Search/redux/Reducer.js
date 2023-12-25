import * as actions from "./Type";

const initialState = {
	isLoading: false,
	search: null,
	filter_data: null,
	searchResults: null,
	searchLoading: false,
};

export const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.POST_SEARCH_BEGIN:
			return {...state, isLoading: true};
		case actions.FETCH_SEARCH_BEGIN:
			return {...state, searchLoading: true};
		case actions.POST_SEARCH_SUCCESS:
			return {...state, search: action.payload, isLoading: false};
		case actions.FETCH_SEARCH_SUCCESS:
			return {...state, searchResults: action.payload, searchLoading: false};
		case actions.SET_FILTERDATA_SUCCESS:
			return {...state, filter_data: action.payload};

		case actions.POST_SEARCH_ERROR:
			return {...state, isLoading: false};
		case actions.FETCH_SEARCH_ERROR:
			return {...state, searchLoading: false};
		default:
			return state;
	}
};
