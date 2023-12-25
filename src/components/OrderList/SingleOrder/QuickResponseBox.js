import React from "react";
import {Button} from "react-bootstrap";
import {BiMoon} from "react-icons/bi";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {openModal} from "../../../redux/Modal/Modal.action";
import ChatBox from "./ChatBox";

function QuickResponseBox({status, handleReload}) {
	const {orderId} = useParams();
	const dispatch = useDispatch();
	return (
		<div className='QuickResponseBox'>
			{status?.slug !== "incomplete" &&
				status?.slug !== "cancelled" &&
				status?.slug !== "complete" &&
				status?.slug !== "delivered" &&
				status?.slug !== "revision" && (
					<>
						<div className='deliveryBtn'>
							<Button
								onClick={() => dispatch(openModal("deliveryModal", orderId))}
							>
								Deliver Now
							</Button>
						</div>
						<span className='DividerOR'>OR</span>
					</>
				)}

			<div className='QuickChatBox'>
				<div className='QuickChatBoxHead'>
					<p>Use a Quick Response</p>
					<ul>
						<li>
							Last seen <span>4 minutes ago</span>
						</li>
						<li>
							Local time <BiMoon />
							<span>Thu 21:14</span>
						</li>
					</ul>
				</div>

				<ChatBox handleReload={handleReload} />
			</div>
		</div>
	);
}

export default QuickResponseBox;
