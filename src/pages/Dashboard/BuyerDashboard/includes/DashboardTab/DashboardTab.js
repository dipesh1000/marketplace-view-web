import React from "react";
import {Nav, Tab} from "react-bootstrap";
import DashTabContent from "./DashTabContent";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import StoreOutlinedIcon from "@material-ui/icons/StoreOutlined";
import NotificationsOffOutlinedIcon from "@material-ui/icons/NotificationsOffOutlined";

const DashboardTab = () => {
	const dosTabItems = [
		{
			icon: <PersonOutlineIcon />,
			text: "Your user profile is incomplete. Please edit it.",
		},
		{
			icon: <StoreOutlinedIcon />,
			text: "You can start selling in 5 minutes. You’d be crazy not to.",
		},
	];

	const notificationItem = [];

	const emptyItem = [
		{
			icon: <NotificationsOffOutlinedIcon />,
			text: "No Notifications",
		},
	];

	return (
		<div className='tab__wrapper'>
			<Tab.Container defaultActiveKey='first'>
				<Nav>
					<Nav.Item>
						<Nav.Link eventKey='first'>
							To Dos <span>({dosTabItems.length})</span>{" "}
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey='second'>Notifications</Nav.Link>
					</Nav.Item>
				</Nav>

				<Tab.Content>
					<Tab.Pane eventKey='first'>
						<DashTabContent
							items={dosTabItems.length === 0 ? emptyItem : dosTabItems}
						/>
					</Tab.Pane>
					<Tab.Pane eventKey='second'>
						<DashTabContent
							items={
								notificationItem.length === 0 ? emptyItem : notificationItem
							}
						/>
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</div>
	);
};

export default DashboardTab;
