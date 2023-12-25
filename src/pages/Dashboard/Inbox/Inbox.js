import React from "react";
import {useSelector} from "react-redux";
import InboxContainer from "../../../components/chat/InboxContainer";
import SellerNavbar from "../../../layout/dashboardLayout/SellerLayout/Navbar/Navbar";
import LoggedInNavbar from "../../../layout/homeLayout/Navbar/LoggedInNavbar";

function Inbox() {
	const {user} = useSelector(state => state.auth);
	return (
		<>
			{user?.role === "seller" && <SellerNavbar />}
			{user?.role === "buyer" && <LoggedInNavbar orderStatus={true} />}
			{(user?.role === "seller" || user?.role === "buyer") && (
				<InboxContainer />
			)}
		</>
	);
}

export default Inbox;
