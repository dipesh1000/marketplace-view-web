import React from "react";
import {BiMoon} from "react-icons/bi";
import ChatBox from "./ChatBox";

function QuickResponseBox() {
	return (
		<div className='QuickResponseBox'>
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

				<ChatBox />
			</div>
		</div>
	);
}

export default QuickResponseBox;
