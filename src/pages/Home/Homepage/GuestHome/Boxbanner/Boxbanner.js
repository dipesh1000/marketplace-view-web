import React from "react";
import "./Boxbanner.css";

function Boxbanner() {
	return (
		<section className='fornt-signup'>
			<div className='container'>
				<div className='box-wrapper'>
					<div className='image'>
						<img
							src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_1400,dpr_1.0/v1/attachments/generic_asset/asset/50218c41d277f7d85feeaf3efb4549bd-1599072608122/bg-signup-1400-x1.png'
							alt=''
							title=''
						/>
					</div>
					<div className='text'>
						<h2>
							Find the <span>talent</span> needed to get your business{" "}
							<span>growing</span>.
						</h2>
						<a className='button-signup' href='/'>
							Get Started
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Boxbanner;
