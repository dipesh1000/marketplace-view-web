import * as actions from "./Type";

const initialState = {
	isLoading: false,
	feedbackLoading: false,
	gigs: null,
	error: null,
	feedbacks: null,
	pagination: null,
	filterData: {
		sort_by: "most_relevant",
		rating_type: null,
		page: null,
		sort_name: "Most Relevant",
	},
	help: {
		helpful: 0,
		not_helpful: 0,
	},
};
export const singlGigDetail = (state = initialState, action) => {
	switch (action.type) {
		case actions.GIG_DETAILS_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case actions.GIG_FEEDBACK_LOADING:
			return {
				...state,
				feedbackLoading: true,
			};
		case actions.GIG_DETAILS_SUCCESS:
			return {
				...state,
				isLoading: false,
				gigs: action.payload.gigs,
			};

		case actions.GIG_FEEDBACK_SUCCESS:
			return {
				...state,
				feedbackLoading: false,
				feedbacks: action.payload.feedbacks.data,
				pagination: action.payload.feedbacks.pagination,
				top_feedbacks: action.payload.top_feedbacks,
			};

		case actions.UPDATE_FILTER_DATA:
			return {
				...state,
				filterData: action.payload,
				help: action.payload,
			};

		case actions.GIG_FEEDBACK_ERROR:
			return {
				...state,
				feedbackLoading: false,
			};

		case actions.GIG_DETAILS_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.error,
			};
		default:
			return state;
	}
};
