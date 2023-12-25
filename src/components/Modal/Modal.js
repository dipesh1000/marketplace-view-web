import React from "react";
import {useDispatch} from "react-redux";
import {closeModal} from "../../redux/Modal/Modal.action";
import {Modal} from "react-bootstrap";
import "./styles/AuthModal.scss";

export default function AuthModal({open, children}) {
	const dispatch = useDispatch();
	const handleClose = () => {
		dispatch(closeModal());
	};

	return (
		<div>
			<Modal show={open} onHide={handleClose} dialogClassName='modalwrapper'>
				{children}
			</Modal>
		</div>
	);
}
