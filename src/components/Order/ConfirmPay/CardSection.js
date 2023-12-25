import React from "react";
import {CardElement} from "@stripe/react-stripe-js";
import "./styles/ConfirmPay.scss";
const CARD_ELEMENT_OPTIONS = {
	style: {
		base: {
			color: "#32325d",
			fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
			fontSmoothing: "antialiased",
			fontSize: "16px",
			"::placeholder": {
				color: "#aab7c4",
			},
		},
		invalid: {
			color: "#fa755a",
			iconColor: "#fa755a",
		},
	},
};
function CardSection({setError}) {
	return (
		<>
			<div className='card-label'>Card Number</div>
			<div className='main-checkout-input'>
				<CardElement
					options={CARD_ELEMENT_OPTIONS}
					onChange={() => setError(null)}
				/>
			</div>
		</>
	);
}
export default CardSection;
