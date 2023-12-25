import React from "react";
import Banner from "./Banner/Banner";
import Boxbanner from "./Boxbanner/Boxbanner";
import FingerTips from "./FingerTip/FingerTips";
import Guides from "./Guides/Guides";
import Inspire from "./Inspire/Inspire";
import MarketPlace from "./MarketPlace/MarketPlace";
import Services from "./Services/Services";
import Testinomials from "./Testinomial/Testinomials";
import Trusted from "./Trusted/Trusted";

function GuestHome() {
	return (
		<>
			<Banner />
			<Trusted />
			<Services />
			<FingerTips />
			<MarketPlace />
			<Testinomials />
			<Inspire />
			<Guides />
			<Boxbanner />
		</>
	);
}

export default GuestHome;
