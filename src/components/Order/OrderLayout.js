import React from "react";
import NavigationBar from "./Navigation/NavigationBar";
import "./styles/Order.scss";

function OrderLayout({children}) {
	return (
		<>
			<NavigationBar />
			{children}
		</>
	);
}

export default OrderLayout;
