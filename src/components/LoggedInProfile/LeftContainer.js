import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {profileFetch} from "./EditProfile/redux/Action";
import MetaContent from "./MetaContent";
import ProfileInfo from "./ProfileInfo";

function LeftContainer() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(profileFetch());
	}, [dispatch]);
	return (
		<div>
			<ProfileInfo />
			<MetaContent />
		</div>
	);
}

export default LeftContainer;
