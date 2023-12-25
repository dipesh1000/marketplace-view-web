import * as actions from "./Type";

const initialState = {
	isLoading: false,
	data: [],
	dialCode: [],
	phoneNumber: null,
	error: null,
	profileGig: [],
	postLoading: false,
};

export const EditProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.EDIT_ACTION_BEGIN:
			return {
				...state,
				postLoading: true,
			};

		case actions.EDIT_ACTION_COMPLETE:
			return {
				...state,
				postLoading: false,
			};

		case actions.PERSONAL_INFO_LOADING:
		case actions.PROFILE_INFO_LOADING:
		case actions.COUNTRY_CODE_LOADING:
		case actions.PHONE_NUMBER_VERIFICATION_LOADING:
		case actions.PROFILE_COMPLETE_LOADING:
		case actions.PROFILE_FETCH_LOADING:
		case actions.PROFILEGIG_FETCH_LOADING:
			return {
				...state,
				isLoading: true,
			};

		case actions.PERSONAL_INFO_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload,
			};
		case actions.FORM_ACTION_SAVE:
			return {
				...state,
				isLoading: false,
			};
		case actions.PERSONAL_INFO_ERROR:
		case actions.PROFILE_INFO_ERROR:
		case actions.COUNTRY_CODE_ERROR:
		case actions.PHONE_NUMBER_VERIFICATION_ERROR:
		case actions.PROFILE_COMPLETE_ERROR:
		case actions.PROFILE_FETCH_ERROR:
		case actions.PROFILEGIG_FETCH_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.error,
			};

		case actions.PROFILE_INFO_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload,
			};

		case actions.COUNTRY_CODE_SUCCESS:
			return {
				...state,
				isLoading: false,
				dialCode: action.payload,
			};
		case actions.PHONE_NUMBER_VERIFICATION_SUCCESS:
			return {
				...state,
				isLoading: false,
				phoneNumber: action.payload,
			};
		case actions.PROFILE_COMPLETE_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case actions.PROFILE_FETCH_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload,
			};

		case actions.PROFILEGIG_FETCH_SUCCESS:
			return {
				...state,
				isLoading: false,
				profileGig: action.payload,
			};

		default:
			return state;
	}
};
