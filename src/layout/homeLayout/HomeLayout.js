import React, {useEffect, useState} from "react";
import Footer from "../../components/Footer/Footer";
import Header from "./Header/Header";

const HomeLayout = ({children}) => {
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
			<Header />
			{children}
			<Footer />
		</>
	);
};
export default HomeLayout;
