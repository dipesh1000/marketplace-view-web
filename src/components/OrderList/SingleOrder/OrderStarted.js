import React from "react";
import {IoRocketOutline} from "react-icons/io5";

function OrderStarted({status}) {
	return (
		<div className='orderstart-wrap'>
			<div className='cards-group'>
				{status?.slug === "incomplete" ? (
					<div className='single-card item'>
						<div className='title_box'>
							<IoRocketOutline className='single-icons' />
							<div className='title_contains'>
								<h6 className='text-heading'>Order Not Started Yet</h6>
								<p className='text-subheading'>
									Countdown will begin after succesfully submission of
									Requirement.
								</p>
							</div>
						</div>
					</div>
				) : (
					<div className='single-card item'>
						<div className='title_box'>
							<IoRocketOutline className='single-icons' />
							<div className='title_contains'>
								<h6 className='text-heading'>Order Started</h6>
								<p className='text-subheading'>
									The order countdown is now ticking...
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default OrderStarted;
