import React from "react";

import "./index.css";
import {Switch} from "react-router";
import routes from "../../navigation/routes";
import PageNotFoundRoute from "../../navigation/PageNotFound";
import RouteWithSubRoutes from "../../navigation/RouteWithSubRoutes";

export default function DashboardIndex() {
	return (
		<>
			<Switch>
				{routes.dashboard.map((route, i) => (
					<RouteWithSubRoutes key={i} {...route} />
				))}
				<PageNotFoundRoute />
			</Switch>
		</>
	);
}
