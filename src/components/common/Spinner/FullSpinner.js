import React from "react";
import {Spinner} from "react-bootstrap";
import {useSelector} from "react-redux";
import "./spinner.css";

function FullSpinner() {
	const {show} = useSelector(state => state.spinner);
	return (
		show && (
			<div className='spinner-wrapper'>
				<Spinner animation='grow' />
			</div>
		)
	);
}

export default FullSpinner;
