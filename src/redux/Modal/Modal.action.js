import * as actions from "./Modal.type";

export const openModal = (modalName, extraValue = null) => {
	return {
		type: actions.OPEN_MODAL,
		payload: {modalName, extraValue},
	};
};

export const closeModal = () => {
	return {
		type: actions.CLOSE_MODAL,
	};
};
