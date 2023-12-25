import * as actions from "./Type";

const initialState = {
  loading: false,
  orders: null,
  orderStatus: null,
  singleOrder: null,
  modifyOrder: null,
  postLoading: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ORDER_FETCH_BEGIN:
    case actions.ORDERSTATUS_FETCH_BEGIN:
    case actions.SINGLEORDER_FETCH_BEGIN:
    case actions.MODIFYORDER_FETCH_BEGIN:
      return { ...state, loading: true };

    case actions.HANDLE_POST_BEGIN:
      return {
        ...state,
        postLoading: true,
      };

    case actions.ORDER_FETCH_SUCCESS:
      return { ...state, orders: action.payload.orders, loading: false };

    case actions.ORDERSTATUS_FETCH_SUCCESS:
      return {
        ...state,
        orderStatus: action.payload.orderstatus,
        loading: false,
      };

    case actions.SINGLEORDER_FETCH_SUCCESS:
      return { ...state, singleOrder: action.payload, loading: false };

    case actions.MODIFYORDER_FETCH_SUCCESS:
      return { ...state, modifyOrder: action.payload, loading: false };

    case actions.ORDER_FETCH_ERROR:
    case actions.ORDERSTATUS_FETCH_ERROR:
    case actions.SINGLEORDER_FETCH_ERROR:
      return { ...state, loading: false };

    case actions.HANDLE_POST_COMPLETE:
      return {
        ...state,
        postLoading: false,
      };

    default:
      return state;
  }
};
