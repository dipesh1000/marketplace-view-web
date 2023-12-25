import React from "react";
import {useSelector} from "react-redux";
import Footer from "../../../components/Footer/Footer";
import LoggedInProfile from "../../../components/LoggedInProfile/LoggedInProfile";
import SellerNavbar from "../../../layout/dashboardLayout/SellerLayout/Navbar/Navbar";
import LoggedInNavbar from "../../../layout/homeLayout/Navbar/LoggedInNavbar";

function Profilepage() {
	const {user} = useSelector(state => state.auth);
	return (
		<>
			{user?.role === "seller" && <SellerNavbar />}
			{user?.role === "buyer" && <LoggedInNavbar orderStatus={true} />}
			{(user?.role === "seller" || user?.role === "buyer") && (
				<LoggedInProfile />
			)}
			<Footer />
		</>
	);
}

export default Profilepage;
