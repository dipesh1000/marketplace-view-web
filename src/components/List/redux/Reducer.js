import * as actions from "./Type";

const initialState = {
	isLoading: false,
	wishlist: null,
};

export const wishListReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.FETCH_WISHLIST_SUCCESS:
			return {...state, wishlist: action.payload, isLoading: false};

		case actions.FETCH_WISHLIST_BEGIN:
			return {...state, isLoading: true};

		case actions.FETCH_WISHLIST_ERROR:
		case actions.POST_WISHLIST_ERROR:
			return {...state, isLoading: false};

		case actions.POST_WISHLIST_SUCCESS:
			return {...state, isLoading: false};

		default:
			return state;
	}
};
