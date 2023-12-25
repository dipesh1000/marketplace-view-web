import {
	directCancelOrderBuyerApi,
	fetchBuyerResolutionApi,
	submitBuyerResolutionApi,
} from "../../../api/resolution/resolutionApi";
import * as actions from "./Type";

export const fetchBuyerResolution = orderId => dispatch => {
	dispatch({
		type: actions.FETCH_RESOLUTION_BEGIN,
	});
	fetchBuyerResolutionApi(orderId)
		.then(res => {
			dispatch({
				type: actions.FETCH_RESOLUTION_SUCCESS,
				payload: res.data,
			});
		})
		.catch(() => {
			dispatch({
				type: actions.FETCH_RESOLUTION_ERROR,
			});
		});
};

export const submitBuyerResolution = (
	orderId,
	data,
	handleHistory
) => dispatch => {
	dispatch({type: actions.HANDLE_POST_BEGIN});
	submitBuyerResolutionApi(orderId, data).then(res => {
		dispatch({type: actions.HANDLE_POST_COMPLETE});
		handleHistory();
	});
};

export const cancelOrderBuyer = (orderId, handleHistory) => dispatch => {
	dispatch({type: actions.CANCEL_ORDER_BUYER_BEGIN});
	directCancelOrderBuyerApi(orderId).then(res => {
		dispatch({type: actions.CANCEL_ORDER_BUYER_COMPLETE});
		handleHistory();
	});
};
