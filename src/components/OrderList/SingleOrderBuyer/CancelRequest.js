import React from "react";
import {FcCancel} from "react-icons/fc";
import {useDispatch} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {handleResolutionBuyer} from "../redux/Action";
import {AiFillWarning} from "react-icons/ai";

function CancelRequest({item, buyer, seller}) {
	const {orderId} = useParams();
	const dispatch = useDispatch();
	const handleDispatch = type => {
		dispatch(handleResolutionBuyer(item?.id, {type: type}, orderId));
	};
	return (
		<>
			<div className='modification-request'>
				<div className='single-card item'>
					<div className='title_box'>
						<FcCancel className='single-icons' />
						<div className='title_contains'>
							<h6 className='text-heading'>Cancel Request</h6>
							<span className='text-subheading'>You stated the issue is:</span>
							<h6 className='issue-name'>
								{item?.other_option_message || item?.resolution_type?.title}
							</h6>
						</div>
					</div>
				</div>
				{item?.type === "seller_cancel_order" ? (
					<>
						<div className='single-card message-box'>
							<div className='title'>
								You offered to cancel the order and the following are the
								details
							</div>
							<div className='message_inner_wrap'>
								<div className='profile_details'>
									<div className='msg-img'>
										<img src={seller?.profileImage?.url?.resize} />
									</div>
									<div className='modify-username'>
										<Link to='/home'>{seller?.name}</Link>
									</div>
								</div>
								<p className='comment-box'>{item?.message}</p>
							</div>
						</div>
						<div className='modify-content'>
							{/* <div className="title">
                You offered to cancel the order and the following are the
                details
              </div> */}
							<div className='message-box'>
								<div className='subtitle'>
									<AiFillWarning /> Buyer need to request within next 4 days or
									the order will be automatically cancelled.
								</div>
							</div>
							<div className='button-container mb-5'>
								{item?.approved_at ? (
									<span>{buyer?.name} Approved Your Request</span>
								) : item?.rejected_at ? (
									<span>{buyer?.name} Rejected Your Request</span>
								) : (
									<>
										<div
											className='accept'
											onClick={() => handleDispatch("approve")}
										>
											Accept
										</div>
										<div
											className='reject'
											onClick={() => handleDispatch("reject")}
										>
											Reject
										</div>
									</>
								)}
							</div>
						</div>
					</>
				) : item?.type === "buyer_cancel_order" ? (
					<>
						<div className='single-card message-box'>
							<div className='title'>
								You offered to cancel the order and the following are the
								details
							</div>
							<div className='message_inner_wrap'>
								<div className='profile_details'>
									<div className='msg-img'>
										<img src={buyer?.profileImage?.url?.resize} />
									</div>
									<div className='msg-content'>
										<Link to='/home'>{buyer?.name}</Link>
									</div>
								</div>
								<p className='comment-box'>{item?.message}</p>
							</div>
						</div>
						<div className='modify-content'>
							<div className='message-box'>
								<div className='subtitle'>
									<AiFillWarning /> Buyer need to request within next 4 days or
									the order will be automatically cancelled.
								</div>
							</div>
							<div className='button-container mb-5'>
								{item?.approved_at ? (
									<span>{seller?.name} Approved Your Request</span>
								) : item?.rejected_at ? (
									<span>{seller?.name} Rejected Your Request</span>
								) : (
									<span>{seller?.name} Request Pending</span>
								)}
							</div>
						</div>
					</>
				) : null}
			</div>
		</>
	);
}

export default CancelRequest;
