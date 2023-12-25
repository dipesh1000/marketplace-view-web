import React from "react";
import {IoRocketOutline} from "react-icons/io5";
import {Link} from "react-router-dom";
import {AiFillWarning} from "react-icons/ai";

function ExtendRequest({item, buyer, seller}) {
	return (
		<>
			<div className='modification-request'>
				<div className='single-card item'>
					<div className='title_box'>
						<IoRocketOutline className='single-icons' />
						<div className='title_contains'>
							<h6 className='text-heading'>Time Extension Request</h6>
							<span className='text-subheading'>You stated the issue is:</span>
							<h6 className='issue-name'>
								{item?.other_option_message || item?.resolution_type?.title}
							</h6>
						</div>
					</div>
				</div>
				<div className='single-card message-box'>
					<div className='title'>
						You offered to modify the order and the following are the details
					</div>
					<div className='modify-content dark_contain_box'>
						<div className='profile_details'>
							<div className='msg-img'>
								<img src={seller?.profileImage?.url?.resize} />
							</div>
							<div className='modify-username'>
								<Link to='/home'>{seller?.name}</Link>
							</div>
						</div>
						<p className='comment-box1'>{item?.message}</p>
						<div className='title'>
							Requested Extended Delivery Time :{" "}
							<strong>{item?.value} Days</strong>
						</div>
					</div>
				</div>
				<div className='message-box'>
					<div className='subtitle'>
						<AiFillWarning />
						Buyer need to request within next 4 days or the order will be
						automatically cancelled.
					</div>
				</div>
				<div className='button-container mb-5'>
					{item?.approved_at ? (
						<span>{buyer?.name} Approved Your Request</span>
					) : item?.rejected_at ? (
						<span>{buyer?.name} Rejected Your Request</span>
					) : (
						<span>{buyer?.name} Request Pending</span>
					)}
				</div>
			</div>
		</>
	);
}

export default ExtendRequest;
