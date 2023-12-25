import React from "react";
import {Container, Dropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import EarningTable from "./EarningTable";
import "./styles/Earning.scss";

function Earning() {
	return (
		<div className='gig-container earning-page'>
			<Container>
				<div className='gig-header'>
					<div className='title'>Earning</div>
					<div className='exp-earning'>
						Expected earnings : <span>$10</span>
					</div>
				</div>
				<div className='earning-body'>
					<div className='earning-main-analytic'>
						<ul>
							<li>
								<p>Net Income</p>
								<span>
									<Link>$13.60</Link>
								</span>
							</li>
							<li>
								<p>Withdraw</p>
								<span>
									<Link>$13.60</Link>
								</span>
							</li>
							<li>
								<p>Used For Purchases</p>
								<span>
									<Link>$13.60</Link>
								</span>
							</li>
							<li>
								<p>Pending Clearance</p>
								<span>
									<Link>$13.60</Link>
								</span>
							</li>
							<li>
								<p>Available for Withdraw</p>
								<span>
									<Link>$13.60</Link>
								</span>
							</li>
						</ul>
					</div>
					<div className='earning-withdraw'>
						<ul>
							<span>Withdraw</span>
							<li>
								<img src='https://img.icons8.com/color/25/000000/paypal.png' />
								<Link>Paypal Account</Link>
							</li>
							<li>
								<img src='https://img.etimg.com/thumb/msid-64777857,width-300,imgsize-17998,,resizemode-4,quality-100/payoneer.jpg' />
								<Link>Paypal Account</Link>
							</li>
							<li>
								<img src='https://img.icons8.com/color/25/000000/paypal.png' />
								<Link>Fiver Revenu Card</Link>
							</li>
						</ul>
					</div>
					<div className='earning-filter'>
						<ul>
							<span>Show</span>
							<li className='fiterEveryThing'>
								<Dropdown>
									<Dropdown.Toggle id='dropdown-basic'>
										Everything
										<i className='fas fa-caret-down '></i>
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Dropdown.Item
											//   onClick={handleDropdown}
											href='#/action-1'
											value='7'
										>
											Webdesign
										</Dropdown.Item>
										<Dropdown.Item
											//   onClick={handleDropdown}
											href='#/action-2'
											value='14'
										>
											Grapgic Design
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</li>
							<li className='filterYear'>
								<Dropdown>
									<Dropdown.Toggle id='dropdown-basic'>
										Year
										<i className='fas fa-caret-down '></i>
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Dropdown.Item
											//   onClick={handleDropdown}
											href='#/action-1'
											value='7'
										>
											Webdesign
										</Dropdown.Item>
										<Dropdown.Item
											//   onClick={handleDropdown}
											href='#/action-2'
											value='14'
										>
											Grapgic Design
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</li>
							<li className='fiterMonths'>
								<Dropdown>
									<Dropdown.Toggle id='dropdown-basic'>
										All Months
										<i className='fas fa-caret-down '></i>
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Dropdown.Item
											//   onClick={handleDropdown}
											href='#/action-1'
											value='7'
										>
											Webdesign
										</Dropdown.Item>
										<Dropdown.Item
											//   onClick={handleDropdown}
											href='#/action-2'
											value='14'
										>
											Grapgic Design
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</li>
						</ul>
						<button type='button' className='csvExp'>
							Export to CSV
						</button>
					</div>
					<EarningTable />
				</div>
				{/* <ManageContactTable
                        loading = {loading}
                        label={currentStatus}
                        count={collectCount}
                        setCount={setCount}
                        data = {contact}
                    /> */}
			</Container>
		</div>
	);
}

export default Earning;
