import React, {useEffect, useState} from "react";
import {Button, Dropdown, Modal, Table} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {deleteGig} from "./redux/Action";
import "./style/Gigpage.scss";

function GigTable({
	gigFilter,
	filterKey,
	label,
	count,
	setCount,
	days,
	setDays,
}) {
	// eslint-disable-next-line
	const [dropdown, setDropdown] = useState();
	const [data, setData] = useState();

	const handleDropdown = e => {
		e.preventDefault();
		setDays(e.target.getAttribute("value"));
		setDropdown(e.target.innerHTML);
	};

	const history = useHistory();
	const handleAction = (e, slug) => {
		e.preventDefault();
		history.push(`/users/seller_dashboard/manage_gigs/${slug}/edit_gigs`);
	};

	const [show, setShow] = useState(false);
	const [gigId, setGigId] = useState();
	const dispatch = useDispatch();
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleDeleteConfirm = () => {
		dispatch(deleteGig(gigId));
		handleClose();
	};
	const handleDelete = id => {
		handleShow();
		setGigId(id);
	};
	useEffect(() => {
		const newData = gigFilter(filterKey);
		setData(newData);
		count.push({id: filterKey, value: newData.length});
		setCount(count);
		// eslint-disable-next-line
	}, [filterKey]);
	return (
		<>
			<div className='table-header'>
				<div className='header-title'>{label}</div>
				<div className='day-filter'>
					<Dropdown>
						<Dropdown.Toggle id='dropdown-basic'>
							{days
								? days > 30
									? `Last ${days / 30} months`
									: `Last ${days} days`
								: "Filter By Days"}
							<i className='fas fa-caret-down '></i>
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item
								onClick={handleDropdown}
								href='#/action-1'
								value='7'
							>
								Last 7 Days
							</Dropdown.Item>
							<Dropdown.Item
								onClick={handleDropdown}
								href='#/action-2'
								value='14'
							>
								Last 14 Days
							</Dropdown.Item>
							<Dropdown.Item
								onClick={handleDropdown}
								value='30'
								href='#/action-3'
							>
								Last 30 Days
							</Dropdown.Item>
							<Dropdown.Item
								onClick={handleDropdown}
								value='60'
								href='#/action-3'
							>
								Last 2 Months
							</Dropdown.Item>
							<Dropdown.Item
								onClick={handleDropdown}
								value='90'
								href='#/action-3'
							>
								Last 3 Months
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
			<Table hover size='sm'>
				<thead>
					<tr>
						<th>
							<input type='checkbox' />
						</th>
						<th>Gig</th>
						{/* <th>Impressions</th>
						<th>Clicks</th> */}
						<th>Orders</th>
						<th>Cancellation</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((item, index) => (
						<tr key={item.id}>
							<td>
								<input type='checkbox' />
							</td>
							<td>{item.title}</td>
							{/* <td>Otto</td>
							<td>@mdo</td> */}
							<td>{item?.total_order}</td>
							<td>{item?.total_cancelled_order}%</td>
							<td>
								<div className='action-filter'>
									<Dropdown>
										<Dropdown.Toggle id='dropdown-basic'>
											<i className='fas fa-caret-down '></i>
										</Dropdown.Toggle>

										<Dropdown.Menu>
											<Dropdown.Item onClick={e => handleAction(e, item.slug)}>
												Edit
											</Dropdown.Item>
											<Dropdown.Item onClick={() => handleDelete(item.id)}>
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
				<div className='table-footer'>No active Gigs to show.</div>
			)}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Delete Gig</Modal.Title>
				</Modal.Header>
				<Modal.Body>Do you really want to delete this Gig? </Modal.Body>
				<Modal.Footer className='flex justify-content-between'>
					<Button variant='danger' onClick={handleDeleteConfirm}>
						Yes
					</Button>
					<Button variant='success' onClick={handleClose}>
						No
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default GigTable;
