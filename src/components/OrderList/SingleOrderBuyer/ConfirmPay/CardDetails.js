import React from "react";
import {Card} from "react-bootstrap";

function CardDetails({children, headerText}) {
	return (
		<div className='CardDetails'>
			<Card>
				<Card.Header as='h6'>{headerText}</Card.Header>
				<Card.Body>{children}</Card.Body>
			</Card>
		</div>
	);
}

export default CardDetails;
