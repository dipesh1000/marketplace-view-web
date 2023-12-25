import React from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./styles/ManageRequest.scss";

function ManageRequestBlank() {
	return (
		<div className='manage_request'>
			<div className='container'>
				<div className='manage-request-wrapper'>
					<div className='main_title'>
						<h1>Manage Request</h1>
					</div>
					<div className='manage_request_box'>
						<div className='image-container'></div>
						<div className='sub_title'>
							<h1>You have not made any requests</h1>
						</div>
						<ul>
							<li>
								<div className='counter'>1</div>
								<div className='item-contant'>
									<h3>Post a Request</h3>
									<p>Describe the service you are searching for.</p>
								</div>
							</li>
							<li>
								<div className='counter'>2</div>
								<div className='item-contant'>
									<h3>Post a Request</h3>
									<p>Describe the service you are searching for.</p>
								</div>
							</li>
							<li>
								<div className='counter'>3</div>
								<div className='item-contant'>
									<h3>Post a Request</h3>
									<p>Describe the service you are searching for.</p>
								</div>
							</li>
						</ul>
						<Link to='/users/manage_requests/new'>Post a Request</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ManageRequestBlank;
