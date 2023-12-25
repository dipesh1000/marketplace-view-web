import React from "react";
import {Spinner} from "react-bootstrap";
import PropTypes from "prop-types";
import "./Style.css";

function ContainerSpinner({variant, animation, height, backgroundColor}) {
	return (
		<div
			className='container-spinner-wrap'
			style={{minHeight: height, background: backgroundColor}}
		>
			<Spinner animation={animation} variant={variant} className='spinner' />
		</div>
	);
}
ContainerSpinner.propTypes = {
	variant: PropTypes.string,
	animation: PropTypes.string,
};
ContainerSpinner.defaultProps = {
	variant: "light",
	backgroundColor: "#f7f7f7",
	animation: "border",
	height: "calc(100vh - 150px)",
};

export default ContainerSpinner;
