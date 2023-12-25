import React from "react";
import {Link} from "react-router-dom";
import styles from "./Breadcrumbs.module.css";
import {IoNotificationsCircleSharp} from "react-icons/io5";
import CustomDropdown from "../../../../components/common/CustomDropdown/CustomDropdown";

function Breadcrumbs() {
	return (
		<>
			<header className={styles.header2}>
				<div className='container'>
					<div className={styles.header__wrapper}>
						<nav className={styles.header2__nav}>
							<ul className={styles.header2__menu}>
								<li className={styles.active}>
									<Link to='/users/dashboard'>Dashboard</Link>
								</li>
								<li>
									<CustomDropdown title='Contact' />
								</li>
								<li>
									<a href='#!'>
										Inbox
										<IoNotificationsCircleSharp />
									</a>
								</li>
								<li>
									<a href='#!'>Settings</a>
								</li>
							</ul>
						</nav>
						<Link
							to='/seller_onboarding/personal_info'
							className={styles.sellBtn}
						>
							Start Selling
						</Link>
						{/* <button className={styles.sellBtn}>Start Selling</button> */}
					</div>
				</div>
			</header>
		</>
	);
}

export default Breadcrumbs;
