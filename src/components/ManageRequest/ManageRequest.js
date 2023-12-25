import React, {useEffect, useState} from "react";
import {Container, Nav, Tab} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import ContainerSpinner from "../common/ContainerSpinner/ContainerSpinner";
import BuyerRequestTable from "./BuyerRequestTable";
import {fetchCustomRequest} from "./redux/Action";
import "./styles/ManageRequest.scss";

const orderDefault = [
	{
		title: "Active",
		slug: "active",
	},
	{
		title: "Paused",
		slug: "paused",
	},
	{
		title: "Pending",
		slug: "pending",
	},
	{
		title: "Unapproved",
		slug: "unapproved",
	},
];

function ManageRequest() {
	const [count, setCount] = useState({
		active: 0,
		paused: 0,
		pending: 0,
		unapproved: 0,
	});
	const [active, setActive] = useState("active");
	const [filterRequest, setFilterRequest] = useState([]);
	const [changeState, setChangeState] = useState(false);

	const dispatch = useDispatch();

	const {customRequest} = useSelector(state => state.manageRequest);
	const handleChangeState = status => {
		setChangeState(status);
	};
	useEffect(() => {
		dispatch(fetchCustomRequest());
	}, [dispatch]);
	useEffect(() => {
		setCount({
			active: customRequest?.filter(list => list?.status === "active").length,
			paused: customRequest?.filter(list => list?.status === "paused").length,
			pending: customRequest?.filter(list => list?.status === "pending").length,
			unapproved: customRequest?.filter(list => list?.status === "unapproved")
				.length,
		});
		setActive("active");
		setChangeState(false);
	}, [customRequest]);
	useEffect(() => {
		const filter = customRequest?.filter(list => list?.status === active);
		setFilterRequest(filter);
	}, [customRequest, active]);

	const handleClick = slug => {
		setActive(slug);
	};

	return (
		<div className='manage_request'>
			<Container>
				<div className='manage-request-wrapper'>
					<div className='main-wrapper'>
						<div className='main_title'>
							<h1>Manage Requests</h1>
						</div>
						<Link to='/users/manage_requests/new'>Post a Request</Link>
					</div>
					{changeState ? (
						<ContainerSpinner />
					) : (
						<Tab.Container id='left-tabs-example' defaultActiveKey={0}>
							<div className='gig-filter-bar'>
								<Nav variant='tabs' className='flex-row'>
									{orderDefault?.map((item, index) => (
										<Nav.Item key={index}>
											<Nav.Link
												eventKey={index}
												onClick={() => handleClick(item.slug)}
											>
												{item.title}

												{count[(item?.slug)] > 0 && (
													<span className='badge'>{count[(item?.slug)]}</span>
												)}
											</Nav.Link>
										</Nav.Item>
									))}
								</Nav>
							</div>
							<BuyerRequestTable
								active={active}
								data={filterRequest}
								handleChangeState={handleChangeState}
							/>
						</Tab.Container>
					)}
				</div>
			</Container>
		</div>
	);
}

export default ManageRequest;
