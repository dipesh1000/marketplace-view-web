import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {
	getProfileInfoStep,
	profileFetch,
} from "../../redux/Profile/Profile.action";
import MetaContent from "./MetaContent";
import ProfileInfo from "./ProfileInfo";

function LeftContainer() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(profileFetch());
	}, []);
	return (
		<div>
			<ProfileInfo />
			<MetaContent />
		</div>
	);
}

export default LeftContainer;
