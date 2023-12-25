import React from "react";
import {Container} from "react-bootstrap";
import "./FingerTips.css";

function FingerTips() {
	return (
		<section className='front-intro'>
			<Container>
				<div className='row'>
					<div className='col-md-5 '>
						<div className='text'>
							<h2>A whole world of freelance talent at your fingertips</h2>
							<ul>
								<li>
									<h6>
										<i className='far fa-check-circle'></i>
										The best for every budget
									</h6>
									<p>
										Find high-quality services at every price point. No hourly
										rates, just project-based pricing.
									</p>
								</li>
								<li>
									<h6>
										<i className='far fa-check-circle'></i>
										Quality work done quickly
									</h6>
									<p>
										Find the right freelancer to begin working on your project
										within minutes.
									</p>
								</li>
								<li>
									<h6>
										<i className='far fa-check-circle'></i>
										Protected payments, every time
									</h6>
									<p>
										Always know what you'll pay upfront. Your payment isn't
										released until you approve the work.
									</p>
								</li>
								<li>
									<h6>
										<i className='far fa-check-circle'></i>
										24/7 support
									</h6>
									<p>
										Questions? Our round-the-clock support team is available to
										help anytime, anywhere.{" "}
									</p>
								</li>
							</ul>
						</div>
					</div>
					<div className='col-md-7 my-auto'>
						<div className='modal-wrapper'>
							<div className='image'>
								<img
									src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_700,dpr_1.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png'
									alt='Fucha'
								/>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}

export default FingerTips;
