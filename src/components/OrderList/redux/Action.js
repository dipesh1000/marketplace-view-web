import {
	buyerReviewSubmitApi,
	cancelOrderApi,
	checkRevisionApi,
	fetchBuyerOrderApi,
	fetchModifiedOrderApi,
	fetchOrderApi,
	fetchOrderStatusApi,
	fetchOrderStatusBuyerApi,
	fetchSingleOrderApi,
	fetchSingleOrderBuyerApi,
	handleResolutionApi,
	handleResolutionBuyerApi,
	sellerReviewSubmitApi,
	sendDeliveryActionApi,
	sendDeliveryApi,
	sendOrderBuyerMessageApi,
	sendOrderMessageApi,
	sendProgressUpdateApi,
	skipOrderRequirementApi,
	submitRequirementBuyerApi,
} from "../../../api/Order/OrderApi";
import {closeModal} from "../../../redux/Modal/Modal.action";
import * as actions from "./Type";

export const fetchOrders = (data, days) => dispatch => {
	dispatch({
		type: actions.ORDER_FETCH_BEGIN,
	});
	fetchOrderApi(data, days)
		.then(res => {
			dispatch({
				type: actions.ORDER_FETCH_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch(() => {
			dispatch({
				type: actions.ORDER_FETCH_ERROR,
			});
		});
};

export const fetchBuyerOrders = (data, days) => dispatch => {
	dispatch({
		type: actions.ORDER_FETCH_BEGIN,
	});
	fetchBuyerOrderApi(data, days)
		.then(res => {
			dispatch({
				type: actions.ORDER_FETCH_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch(() => {
			dispatch({
				type: actions.ORDER_FETCH_ERROR,
			});
		});
};

export const fetchOrderStatus = () => dispatch => {
	dispatch({
		type: actions.ORDERSTATUS_FETCH_BEGIN,
	});
	fetchOrderStatusApi()
		.then(res => {
			dispatch({
				type: actions.ORDERSTATUS_FETCH_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch(() => {
			dispatch({
				type: actions.ORDERSTATUS_FETCH_ERROR,
			});
		});
};

export const fetchOrderStatusBuyer = () => dispatch => {
	dispatch({
		type: actions.ORDERSTATUS_FETCH_BEGIN,
	});
	fetchOrderStatusBuyerApi()
		.then(res => {
			dispatch({
				type: actions.ORDERSTATUS_FETCH_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch(() => {
			dispatch({
				type: actions.ORDERSTATUS_FETCH_ERROR,
			});
		});
};

export const fetchSingleOrder = orderId => dispatch => {
	dispatch({
		type: actions.SINGLEORDER_FETCH_BEGIN,
	});
	fetchSingleOrderApi(orderId)
		.then(res => {
			dispatch({
				type: actions.SINGLEORDER_FETCH_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch(() => {
			dispatch({
				type: actions.SINGLEORDER_FETCH_ERROR,
			});
		});
};

export const fetchSingleOrderBuyer = orderId => dispatch => {
	dispatch({
		type: actions.SINGLEORDER_FETCH_BEGIN,
	});
	fetchSingleOrderBuyerApi(orderId)
		.then(res => {
			dispatch({
				type: actions.SINGLEORDER_FETCH_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch(() => {
			dispatch({
				type: actions.SINGLEORDER_FETCH_ERROR,
			});
		});
};

export const fetchModifiedOrder = resolutionId => dispatch => {
	dispatch({
		type: actions.MODIFYORDER_FETCH_BEGIN,
	});
	fetchModifiedOrderApi(resolutionId)
		.then(res => {
			dispatch({
				type: actions.MODIFYORDER_FETCH_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch(() => {
			dispatch({
				type: actions.MODIFYORDER_FETCH_ERROR,
			});
		});
};

export const sendOrderMessage = (orderId, data) => dispatch => {
	dispatch({type: actions.HANDLE_POST_BEGIN});

	sendOrderMessageApi(orderId, data).then(res => {
		dispatch({type: actions.HANDLE_POST_COMPLETE});

		dispatch(fetchSingleOrder(orderId));
	});
};

export const sendOrderBuyerMessage = (orderId, data) => dispatch => {
	dispatch({type: actions.HANDLE_POST_BEGIN});
	sendOrderBuyerMessageApi(orderId, data).then(res => {
		dispatch({type: actions.HANDLE_POST_COMPLETE});
		dispatch(fetchSingleOrderBuyer(orderId));
	});
};

export const sendProgressUpdate = (orderId, data) => dispatch => {
	sendProgressUpdateApi(orderId, data).then(res => {
		dispatch(closeModal());
		dispatch(fetchSingleOrder(orderId));
	});
};

export const handleResolution = (resolutionId, data, orderId) => dispatch => {
	handleResolutionApi(resolutionId, data).then(res => {
		dispatch(fetchSingleOrder(orderId));
	});
};

export const handleResolutionBuyer = (
	resolutionId,
	data,
	orderId
) => dispatch => {
	handleResolutionBuyerApi(resolutionId, data).then(res => {
		dispatch(fetchSingleOrderBuyer(orderId));
	});
};

export const skipOrderRequirement = orderId => dispatch => {
	skipOrderRequirementApi(orderId).then(res => {
		dispatch(fetchSingleOrder(orderId));
	});
};

export const sendDelivery = (orderId, data) => dispatch => {
	sendDeliveryApi(orderId, data).then(res => {
		dispatch(closeModal());
		dispatch(fetchSingleOrder(orderId));
	});
};

export const sendDeliveryAction = (
	orderId,
	data,
	handleClose = null
) => dispatch => {
	sendDeliveryActionApi(orderId, data).then(res => {
		handleClose && handleClose();
		dispatch(fetchSingleOrderBuyer(orderId));
	});
};

export const checkRevision = (data, orderId) => dispatch => {
	checkRevisionApi(orderId, data).then(res => {
		dispatch(fetchSingleOrder(orderId));
	});
};

export const submitRequirementBuyer = (orderId, data) => dispatch => {
	submitRequirementBuyerApi(orderId, data).then(res => {
		dispatch(fetchSingleOrderBuyer(orderId));
	});
};

export const buyerReviewSubmit = (
	orderId,
	data,
	handleRoute = null
) => dispatch => {
	dispatch({type: actions.HANDLE_POST_BEGIN});
	buyerReviewSubmitApi(orderId, data)
		.then(res => {
			dispatch({type: actions.HANDLE_POST_COMPLETE});
			handleRoute && handleRoute();
		})
		.catch(error => {
			dispatch({type: actions.HANDLE_POST_COMPLETE});
		});
};

export const sellerReviewSubmit = (orderId, data) => dispatch => {
	dispatch({type: actions.HANDLE_POST_BEGIN});
	sellerReviewSubmitApi(orderId, data)
		.then(res => {
			dispatch({type: actions.HANDLE_POST_COMPLETE});
			dispatch(fetchSingleOrder(orderId));
		})
		.catch(error => {
			dispatch({type: actions.HANDLE_POST_COMPLETE});
		});
};

export const cancelOrder = data => dispatch => {
	cancelOrderApi(data).then(res => {
		dispatch(closeModal());
	});
};
