import React from "react";
import {IoRocketOutline} from "react-icons/io5";
import {useDispatch} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {handleResolutionBuyer} from "../redux/Action";
import {AiFillWarning} from "react-icons/ai";

function ExtendRequest({item, buyer, seller}) {
	const dispatch = useDispatch();
	const {orderId} = useParams();
	const handleDispatch = type => {
		dispatch(handleResolutionBuyer(item?.id, {type: type}, orderId));
	};
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
						<span>You Approve Request</span>
					) : item?.rejected_at ? (
						<span>You Reject Request</span>
					) : (
						<>
							<div className='accept' onClick={() => handleDispatch("approve")}>
								Accept
							</div>
							<div className='reject' onClick={() => handleDispatch("reject")}>
								Reject
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default ExtendRequest;
