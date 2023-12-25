import {
	directCancelOrderSellerApi,
	fetchResolutionApi,
	submitResolutionApi,
} from "../../../api/resolution/resolutionApi";
import * as actions from "./Type";

export const fetchResolution = orderId => dispatch => {
	dispatch({
		type: actions.FETCH_RESOLUTION_BEGIN,
	});
	fetchResolutionApi(orderId)
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

export const submitResolution = (orderId, data, handleHistory) => dispatch => {
	dispatch({type: actions.HANDLE_POST_BEGIN});
	submitResolutionApi(orderId, data)
		.then(res => {
			dispatch({type: actions.HANDLE_POST_COMPLETE});
			handleHistory();
		})
		.catch(err => {
			dispatch({type: actions.HANDLE_POST_COMPLETE});
		});
};

export const cancelOrderSeller = (orderId, handleHistory) => dispatch => {
	dispatch({type: actions.CANCEL_ORDER_SELLER_BEGIN});
	directCancelOrderSellerApi(orderId).then(res => {
		dispatch({type: actions.CANCEL_ORDER_SELLER_COMPLETE});
		handleHistory();
	});
};
