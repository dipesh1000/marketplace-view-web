import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import ReviewContain from "./ReviewContain";
import ReviewSidebar from "./ReviewSidebar";
import "./styles/Review.scss";

function Review() {
	return (
		<div className='review_wrapper'>
			<Container>
				<Row>
					<Col md={9}>
						<ReviewContain />
					</Col>
					<Col md={3}>
						<ReviewSidebar />
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Review;
