import React from "react";
import BreadCrumb from "../common/BreadCrumb/BreadCrumb";
import AboutThisGig from "./AboutThisGig";
import AboutThisSeller from "./AboutThisSeller";
import GigComparePackages from "./GigComparePackages";
import GigHeader from "./GigHeader";
import GigSellerReview from "./GigSellerReview";
import GigsFaq from "./GigsFaq";
import GigSinglePackage from "./GigSinglePackage";
import GigSingleSlider from "./GigSingleSlider";
import GigsRelatedTags from "./GigsRelatedTags";
import {shallowEqual, useSelector} from "react-redux";
import GigReview from "./GigReview";

const breadData = [
	{
		id: 1,
		title: "Graphics & Design",
	},
	{
		id: 2,
		title: "Logo Design",
	},
];
function GigSingleContent({values, setValues}) {
	const {gigs} = useSelector(state => state.gigDetails, shallowEqual);

	return (
		<>
			<BreadCrumb data={breadData} gigs={gigs} />
			<GigHeader />
			<GigSingleSlider />
			<GigSellerReview />
			<AboutThisGig />
			<AboutThisSeller />
			{gigs?.hasMultiplePackage === false ? (
				<GigSinglePackage values={values} setValues={setValues} />
			) : (
				<GigComparePackages values={values} setValues={setValues} />
			)}
			<GigsFaq />
			<GigReview />
			<GigsRelatedTags />
		</>
	);
}

export default GigSingleContent;
