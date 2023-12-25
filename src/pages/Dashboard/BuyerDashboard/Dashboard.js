import React from "react";
import {Col, Row} from "react-bootstrap";
import DashboardTab from "./includes/DashboardTab/DashboardTab";
import Sidebar from "./includes/Sidebar/Sidebar";
import styles from "../index.module.css";
import Breadcrumbs from "../../../layout/dashboardLayout/Header/Breadcrumbs/Breadcrumbs";
function BuyerDashboard() {
	return (
		<>
			<Breadcrumbs />
			<section id={styles.main_content}>
				<div className='container'>
					<Row className='margin-escape'>
						<Col md='3' lg='3' className={styles.side__board}>
							<Sidebar />
						</Col>
						<Col md='9' lg='9' className={styles.main__board}>
							<div className={styles.main__wrapper}>
								<DashboardTab />
							</div>
						</Col>
					</Row>
				</div>
			</section>
		</>
	);
}

export default BuyerDashboard;
