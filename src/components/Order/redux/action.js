import {
	getOrdeByCodeApi,
	getOrderRequirementApi,
	getSellerOrderByCodeApi,
	sendCheckoutDataApi,
	submitRequirementApi,
} from "../../../api/checkout/checkoutApi";
import * as actions from "./type";

export const sendCheckoutData = (data, handleHistory) => dispatch => {
	dispatch({
		type: actions.HANDLE_LOADING_BEGIN,
	});
	sendCheckoutDataApi(data)
		.then(res => {
			dispatch({
				type: actions.HANDLE_LOADING_COMPLETE,
			});
			handleHistory(res.data.data);
		})
		.catch(() => {
			dispatch({
				type: actions.HANDLE_LOADING_COMPLETE,
			});
		});
};

export const submitRequirement = (orderId, data, handleHistory) => dispatch => {
	dispatch({
		type: actions.HANDLE_LOADING_BEGIN,
	});
	submitRequirementApi(orderId, data)
		.then(res => {
			dispatch({
				type: actions.HANDLE_LOADING_COMPLETE,
			});
			handleHistory();
		})
		.catch(err =>
			dispatch({
				type: actions.HANDLE_LOADING_COMPLETE,
			})
		);
};

export const getOrderByCode = (orderId, isSeller = null) => dispatch => {
	dispatch({
		type: actions.FETCH_ORDERBYCODE_BEGIN,
	});
	isSeller
		? getSellerOrderByCodeApi(orderId)
				.then(res => {
					dispatch({
						type: actions.FETCH_ORDERBYCODE_SUCCESS,
						payload: res.data?.data,
					});
				})
				.catch(err => {
					dispatch({
						type: actions.FETCH_ORDERBYCODE_ERROR,
					});
				})
		: getOrdeByCodeApi(orderId)
				.then(res => {
					dispatch({
						type: actions.FETCH_ORDERBYCODE_SUCCESS,
						payload: res.data?.data,
					});
				})
				.catch(err => {
					dispatch({
						type: actions.FETCH_ORDERBYCODE_ERROR,
					});
				});
};

export const getOrderRequirement = orderId => dispatch => {
	dispatch({
		type: actions.FETCH_ORDERREQUIREMENT_BEGIN,
	});
	getOrderRequirementApi(orderId)
		.then(res => {
			dispatch({
				type: actions.FETCH_ORDERREQUIREMENT_SUCCESS,
				payload: res.data?.data,
			});
		})
		.catch(err => {
			dispatch({
				type: actions.FETCH_ORDERREQUIREMENT_ERROR,
			});
		});
};
