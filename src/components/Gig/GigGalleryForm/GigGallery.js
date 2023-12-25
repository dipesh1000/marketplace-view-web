import React, {useEffect} from "react";
import Form from "./GigGalleryForm";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router";
import {fetchsingleGig} from "../GigPage/redux/Action";
import {getMedia, updateGigGallery} from "./redux/Action";

function GigGalleryAdd() {
	const dispatch = useDispatch();
	const {singleGig} = useSelector(state => state.gig, shallowEqual);

	const {slug} = useParams();
	useEffect(() => {
		dispatch(fetchsingleGig(slug));
		dispatch(getMedia(slug));
		// eslint-disable-next-line
	}, []);

	const history = useHistory();
	const handleHistory = () => {
		history.push(`/users/seller_dashboard/manage_gigs/${slug}/gigs_publish`);
	};
	const handleContinue = () => {
		const formData = {step: "gallery"};
		dispatch(updateGigGallery(formData, singleGig.id, handleHistory));
	};

	return (
		<Form slug={slug} singleGig={singleGig} handleContinue={handleContinue} />
	);
}

export default React.memo(GigGalleryAdd);
