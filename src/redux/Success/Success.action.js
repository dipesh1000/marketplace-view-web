import * as actions from "./Success.type";

export const returnSuccess = message => dispatch => {
	dispatch({
		type: actions.GET_SUCCESS,
		payload: message,
	});
	setTimeout(() => dispatch(clearSuccess()), 3000);
};

export const clearSuccess = () => {
	return {
		type: actions.CLEAR_SUCCESS,
	};
};
