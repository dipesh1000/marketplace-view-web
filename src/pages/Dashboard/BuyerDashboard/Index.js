import React from "react";
import BuyerLayout from "../../../layout/dashboardLayout/BuyerLayout/Layout";
import {Switch} from "react-router";
import PageNotFoundRoute from "../../../navigation/PageNotFound";
import RouteWithSubRoutes from "../../../navigation/RouteWithSubRoutes";

function BuyerIndex({routes}) {
	return (
		<BuyerLayout>
			<Switch>
				{/* <Route path="/" exact>
            <UserHome />
          </Route> */}
				{routes.map((route, i) => (
					<RouteWithSubRoutes key={i} {...route} />
				))}
				<PageNotFoundRoute />
			</Switch>
		</BuyerLayout>
	);
}

export default BuyerIndex;
