import React, {useState} from "react";
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";

function ManageContactTable({label, count, setCount, data, loading}) {
	// eslint-disable-next-line
	const truncate = (str, n) => {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	};
	// eslint-disable-next-line
	const [fullText, setFullText] = useState(false);
	return (
		<>
			<div className='table-header'>
				<div className='header-title'>
					{label} WHO HAVE PURCHASED GIGS FROM YOU.
				</div>
			</div>
			<Table hover size='sm' className='contact-details'>
				<thead>
					<tr>
						<th className='colDate text-left pl-3' colspan={2}>
							Buyer Name
						</th>
						<th className='colCompleteOrder'>Completed Orders</th>
						<th className='colRequest'>Amount Spent</th>
						<th className='colOffers'>Last Order</th>
						<th className='colDuration'></th>
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<div>Loading....</div>
					) : (
						data?.map((order, index) => (
							<tr key={order.id}>
								<td className='col-cell colProfile'>
									<div
										className='buyerImage'
										style={{
											backgroundImage:
												"url('https://fiverr-res.cloudinary.com/image/upload/t_profile_small,q_auto,f_auto/v1/attachments/profile/photo/e4abf05d5fdee7a409b46aa70d69f237-1604287731936/25edbab4-a03c-4fdb-b037-18536a235fda.jpg')",
										}}
									></div>
								</td>
								<td className='col-cell colUserName'>
									{order.username}
									<div className='userLinks'>
										<Link to='#'>User Profile</Link> |
										<Link to='#'> History</Link>
									</div>
								</td>
								<td className='col-cell colCompleteOrder'>
									{order.ordercompleted}
								</td>
								<td className='col-cell colCompleteOrder'>{order.budget}</td>
								<td className='col-cell colOrderDate'>{order.budget}</td>
								<td className='col-cell colActionItem'>
									<div className='hideOption'>
										<button type='button'>Send Offer</button>
									</div>
								</td>
							</tr>
						))
					)}
				</tbody>
			</Table>
			{data?.length === 0 && (
				<div className='table-footer'>No active Orders to show.</div>
			)}
		</>
	);
}

export default ManageContactTable;
