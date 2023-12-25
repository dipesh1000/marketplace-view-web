import React from "react";
import {useState} from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import Chatarea from "./Chatarea";
import Chatlist from "./Chatlist";
import "./style/style.scss";
function InboxContainer(props) {
	const {url} = useRouteMatch();

	const [params, setParams] = useState();
	return (
		<div className='inbox-page'>
			<div className='inbox-wrapper'>
				<div className='sidebar'>
					<Chatlist params={params} />
				</div>
				<div className='main-area'>
					<Switch>
						<Route path={`${url}/`} exact>
							<div className='empty-wrap'>
								<div>
									<div className='empty-icon'>
										<i className='far fa-comments'></i>
									</div>
									<div className='empty-title'>Select a conversation</div>
									<div className='empty-subtitle'>
										Try selecting a conversation or searching for someone
										specific.
									</div>
								</div>
							</div>
						</Route>
						<Route path={`${url}/:username`}>
							<Chatarea setParams={setParams} />
						</Route>
					</Switch>
				</div>
			</div>
		</div>
	);
}

export default InboxContainer;
