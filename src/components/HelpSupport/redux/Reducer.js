import * as actions from "./Type";

const initialState = {
	isLoading: false,
	help: null,
};

export const helpReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.FETCH_HELP_SUCCESS:
			return {...state, help: action.payload, isLoading: false};

		case actions.POST_HELP_SUCCESS:
			return {...state, isLoading: false};

		case actions.FETCH_HELP_BEGIN:
			return {...state, isLoading: true};

		case actions.FETCH_HELP_ERROR:
		case actions.POST_HELP_ERROR:
			return {...state, isLoading: false};

		default:
			return state;
	}
};
