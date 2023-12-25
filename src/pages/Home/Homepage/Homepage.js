import React from "react";
import Footer from "../../../components/Footer/Footer";
import GuestHeader from "../../../layout/homeLayout/Header/GuestHeader";
import GuestHome from "./GuestHome/GuestHome";
export default function Homepage() {
	return (
		<>
			<GuestHeader />
			<GuestHome />
			<Footer />
		</>
	);
}
