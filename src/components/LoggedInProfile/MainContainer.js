import React from "react";
import {Button} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import GigTabs from "./GigTabs";

function MainContainer() {
	const history = useHistory();
	const {user} = useSelector(state => state.auth);
	const handleBecomeSeller = () => {
		history.push("/seller_onboarding/personal_info");
	};
	// eslint-disable-next-line
	const handleCreateGig = () => {
		history.push("/users/seller_dashboard/manage_gigs/create_gigs");
	};
	return (
		<>
			<div className='main-contain'>
				{user.role === "buyer" && (
					<div className='notation-box box-layout'>
						<p>It seems that you don't have any active Gigs. Get selling!</p>
						<Button onClick={handleBecomeSeller}>Create a New Gig</Button>
					</div>
				)}
				{user.role === "seller" && (
					<>
						<GigTabs />
					</>
				)}
			</div>
		</>
	);
}

export default MainContainer;
