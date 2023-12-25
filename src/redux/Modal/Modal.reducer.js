import * as actions from "./Modal.type";
const initialState = {
  modalStatus: false,
  modalName: "",
  extraValue: "",
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.OPEN_MODAL:
      return {
        modalStatus: true,
        modalName: action.payload.modalName,
        extraValue: action.payload.extraValue
      };
    case actions.CLOSE_MODAL:
      return {
        ...state,
        modalStatus: false,
      };
    default:
      return state;
  }
};
