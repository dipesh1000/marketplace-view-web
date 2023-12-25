import React from "react";
import {FaPlus} from "react-icons/fa";
import {Link, useParams} from "react-router-dom";

const VimeoLogin = () => {
	const client_id = "f3d50626516976e0e2fd7a841f2929b0d21bef8a";
	const redirect_uri = "http://localhost:3000/";
	const {user} = useParams();
	return (
		<div>
			<Link
				to={{
					pathname: `https://api.vimeo.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${user}`,
				}}
				// to={{
				// 	pathname: `https://api.vimeo.com/oauth/authorize?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}`,
				// }}
				target='_top'
			>
				<FaPlus />
			</Link>
		</div>
	);
};

export default VimeoLogin;
