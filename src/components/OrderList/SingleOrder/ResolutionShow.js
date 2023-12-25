import React from "react";
import {IoCheckboxOutline} from "react-icons/io5";
import {FcCancel} from "react-icons/fc";
import {formatDate} from "../../../utils/TimestamptoDate";

function ResolutionShow({date, status, type}) {
	return (
		<>
			{status === "approved" ? (
				<div className='resolution-wrap'>
					<div className='cards-group'>
						<div className='single-card item'>
							<div className='title_box'>
								<IoCheckboxOutline className='single-icons' />
								<div className='title_contains'>
									<h6 className='text-heading'>Resolution Accepted</h6>
									<p className='text-subheading'>
										{type === "seller_modify_order" ? (
											<div>Modification Request has been Accepted</div>
										) : type === "seller_extended_delivery_time" ? (
											<div>Delivery Time Extension has been Accepted </div>
										) : type === "seller_cancel_order" ? (
											<div>Cancel Request has been Accepted</div>
										) : type === "buyer_cancel_order" ? (
											<div>Cancel Request has been Accepted</div>
										) : type === "buyer_progress_update" ? (
											<div>Progress Update Request has been Accepted</div>
										) : null}
									</p>
									<div className='date'>{formatDate(date)}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className='resolution-wrap rejected'>
					<div className='cards-group'>
						<div className='single-card item'>
							<div className='title_box'>
								<FcCancel className='single-icons' />
								<div className='title_contains'>
									<h6 className='text-heading'>Resolution Rejected</h6>
									<p className='text-subheading'>
										{type === "seller_modify_order" ? (
											<div>Modification Request has been Rejected</div>
										) : type === "seller_extended_delivery_time" ? (
											<div>Delivery Time Extension has been Rejected </div>
										) : type === "seller_cancel_order" ? (
											<div>Cancel Request has been Rejected</div>
										) : type === "buyer_cancel_order" ? (
											<div>Cancel Request has been Rejected</div>
										) : type === "buyer_progress_update" ? (
											<div>Progress Update Request has been Rejected</div>
										) : null}
									</p>
									<div className='date'>{formatDate(date)}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default ResolutionShow;
