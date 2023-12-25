import React from "react";
import {Card} from "react-bootstrap";
import ContainerSpinner from "../../common/ContainerSpinner/ContainerSpinner";
import RequirementForm from "./RequirementForm";

function MainContent({orderRequirement, orderId}) {
	return !orderRequirement ? (
		<ContainerSpinner />
	) : (
		<div className='MainContent'>
			<div className='CardDetails'>
				<Card>
					<Card.Header as='h6' className='text-center requirment-card'>
						Submit requirement to Start Your Order
					</Card.Header>
					<Card.Body>
						<Card.Title>
							<h6 className='FormTitleContent'>
								The seller needs the following information to start working on
								your order:
							</h6>
						</Card.Title>
						<RequirementForm
							orderRequirement={orderRequirement}
							orderId={orderId}
							url='/users/dashboard/singleorders/'
						/>
					</Card.Body>
				</Card>
			</div>
			{/* <CardDetails headerText="Submit requirement to Start Your Order">
        <Card.Title>
          <h6 className="FormTitleContent">
            The seller needs the following information to start working on your
            order:
          </h6>
        </Card.Title>
        <RequirementForm
          orderRequirement={orderRequirement}
          orderId={orderId}
          url="/users/dashboard/singleorders/"
        />
      </CardDetails> */}
		</div>
	);
}

export default MainContent;
