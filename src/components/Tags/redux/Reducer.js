import * as actions from "./Type";

const initialState = {
	isLoading: false,
	tags: null,
};

export const tagsReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.FETCH_TAGS_BEGIN:
			return {...state, isLoading: true};
		case actions.FETCH_TAGS_SUCCESS:
			return {...state, tags: action.payload, isLoading: false};
		case actions.FETCH_TAGS_ERROR:
			return {...state, isLoading: false};
		default:
			return state;
	}
};
