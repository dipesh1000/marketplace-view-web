import React, {useEffect, useState} from "react";
import GuestNavBar from "../Navbar/GuestNavBar";
import PrimaryCat from "../PrimaryCat/PrimaryCat";

function GuestHeader() {
	// eslint-disable-next-line
	const [openLogin, setOpenLogin] = useState(false);
	// eslint-disable-next-line
	const [openRegister, setOpenRegister] = useState(false);

	const handleLoginOpen = () => {
		setOpenLogin(true);
	};
	const handleRegisterOpen = () => {
		setOpenRegister(true);
	};
	let listener = null;
	const [scrollState, setScrollState] = useState("top");

	useEffect(() => {
		// eslint-disable-next-line
		listener = document.addEventListener("scroll", e => {
			var scrolled = document.scrollingElement.scrollTop;
			if (scrolled >= 120) {
				if (scrollState !== "active") {
					setScrollState("active");
				}
			} else {
				if (scrollState !== "top") {
					setScrollState("top");
				}
			}
		});
		return () => {
			document.removeEventListener("scroll", listener);
		};
	}, [scrollState]);
	return (
		<>
			<GuestNavBar
				handleOpenLogin={handleLoginOpen}
				handleOpenRegister={handleRegisterOpen}
				scrollState={scrollState}
			/>
			<PrimaryCat scrollState={scrollState} />
		</>
	);
}

export default GuestHeader;
