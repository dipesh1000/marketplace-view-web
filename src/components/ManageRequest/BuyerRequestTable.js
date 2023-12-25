import React from "react";
import {Dropdown, Table} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {formatDate} from "../../utils/TimestamptoDate";
import {changeRequestStatus, deleteCustomRequest} from "./redux/Action";

function BuyerRequestTable({label, data, active, handleChangeState}) {
	const dispatch = useDispatch();
	const handleRemove = id => {
		dispatch(deleteCustomRequest(id, handleChangeState));
	};
	const getStatus = () => {
		if (active === "active") {
			return "Pause";
		} else if (active === "paused") {
			return "Active";
		}
	};
	const handleStatus = id => {
		handleChangeState(true);
		if (active === "active") {
			dispatch(changeRequestStatus(id, {status: "paused"}, handleChangeState));
		} else if (active === "paused") {
			dispatch(changeRequestStatus(id, {status: "active"}, handleChangeState));
		}
	};
	return (
		<>
			<Table hover size='sm' className='ordersTable'>
				<thead>
					<tr>
						<th>Date</th>
						<th>Request</th>
						<th>Offer</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data?.map(request => (
						<tr key={request?.id}>
							<td className='col-cell'>
								{formatDate(request?.created_at, "MMMM d, YYYY")}
							</td>
							<td className='col-cell col-offer-2'>
								<div className='request_project'>{request?.description}</div>
								<div className='meta_details'>
									<div className='meta_item'>
										Delivery Time - {request?.delivery_time} days
									</div>
									<div className='meta_item'>Budget - ${request?.budget}</div>
								</div>
								<div className='file-list'>
									{request?.files?.map(file => (
										<a href={file?.url} key={file?.id}>
											<i className='fa fa-download'></i>
											{file?.name}
										</a>
									))}
								</div>
							</td>
							<td className='col-cell offer-cell'>
								<Link to={`/users/manage_requests/${request?.id}`}>
									{" "}
									<span>{request?.total_offers}</span> Review Offers
								</Link>
							</td>

							<td>
								<div className='action-filter'>
									<Dropdown>
										<Dropdown.Toggle id='dropdown-basic'>
											<i className='fas fa-caret-down '></i>
										</Dropdown.Toggle>

										<Dropdown.Menu>
											<Dropdown.Item onClick={() => handleStatus(request?.id)}>
												{getStatus()}
											</Dropdown.Item>
											<Dropdown.Item onClick={() => handleRemove(request?.id)}>
												Delete
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			{data?.length === 0 && (
				<div className='table-footer'>No active Orders to show.</div>
			)}
		</>
	);
}

export default BuyerRequestTable;
