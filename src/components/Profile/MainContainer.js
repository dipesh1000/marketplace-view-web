import React from "react";
import {Button} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";

function MainContainer() {
	const history = useHistory();
	const handleClick = () => {
		history.push("/seller_onboarding/personal_info");
	};
	return (
		<>
			<div className='main-contain'>
				<div className='notation-box box-layout'>
					<p>It seems that you don't have any active Gigs. Get selling!</p>
					<Button onClick={handleClick}>Create a New Gig</Button>
				</div>
			</div>
		</>
	);
}

export default MainContainer;
