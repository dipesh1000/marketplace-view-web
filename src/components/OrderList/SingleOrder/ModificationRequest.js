import React from "react";
import {GrNotes} from "react-icons/gr";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";
import {AiFillWarning} from "react-icons/ai";

function ModificationRequest({item, buyer, seller}) {
	const totalprice = item?.options?.reduce(
		(a, b) => a + parseInt(b.total_price),
		0
	);
	return (
		<>
			<div className='modification-request'>
				<div className='single-card item'>
					<div className='title_box'>
						<GrNotes className='single-icons' />
						<div className='title_contains'>
							<h6 className='text-heading'>Modification Request</h6>
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
						<div className='single-card message-box'>
							<div className='profile_details'>
								<div className='msg-img'>
									<img src={seller?.profileImage?.url?.resize} />
								</div>
								<div className='modify-username'>
									<Link to='/home'>{seller?.name}</Link>
								</div>
							</div>
						</div>
						<p className='comment-box1'>{item?.message}</p>
						<div className='CardTable'>
							<Table>
								<thead>
									<tr>
										<th>Item</th>
										<th>Quantity</th>
										<th>Duration</th>
										<th>Amount</th>
									</tr>
								</thead>

								{item?.options?.map(item => (
									<tr key={item.id}>
										<td>
											<b>{item.title}</b>
										</td>
										<td>{item.quantity}</td>
										<td>{item.extra_value || 0} Days</td>
										<td>$ {item.total_price} </td>
									</tr>
								))}
							</Table>
						</div>
						<hr />
						<div className='order-ttl'>
							<b>Total $ {totalprice}</b>
						</div>
						<div className='button-container'>
							{item?.approved_at ? (
								<span>{buyer?.name} Approved Your Request</span>
							) : item?.rejected_at ? (
								<span>{buyer?.name} Rejected Your Request</span>
							) : (
								<span>{buyer?.name} Request Pending</span>
							)}
						</div>
					</div>
				</div>
				<div className='message-box'>
					<div className='subtitle mb-4'>
						<AiFillWarning />
						Buyer need to request within next 4 days or the order will be
						automatically cancelled.
					</div>
				</div>
			</div>
		</>
	);
}

export default ModificationRequest;
