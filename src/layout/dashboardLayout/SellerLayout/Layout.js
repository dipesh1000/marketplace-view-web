import React from "react";
import SellerNavbar from "./Navbar/Navbar";

function SellerLayout({children}) {
	return (
		<>
			<SellerNavbar />
			<div className='main_content'>{children}</div>
		</>
	);
}

export default SellerLayout;
