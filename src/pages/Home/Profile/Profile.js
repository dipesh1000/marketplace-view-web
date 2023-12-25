import React from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import Profilepage from "../../Dashboard/ProfilePage/Profilepage";
import FreelancerProfile from "./FreelancerProfile";

function Profile() {
	const {user} = useParams();
	const auth = useSelector(state => state.auth);
	return (
		<>
			<div className='profile-wrapper'>
				{auth.user?.username === user ? <Profilepage /> : <FreelancerProfile />}
			</div>
		</>
	);
}

export default Profile;
