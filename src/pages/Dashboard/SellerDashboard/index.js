import React from "react";
import {Switch} from "react-router";
import SellerLayout from "../../../layout/dashboardLayout/SellerLayout/Layout";
import PageNotFoundRoute from "../../../navigation/PageNotFound";
import RouteWithSubRoutes from "../../../navigation/RouteWithSubRoutes";

function SellerIndex({routes}) {
	return (
		<>
			<SellerLayout>
				<Switch>
					{/* <Route path="/" exact>
            <UserHome />
          </Route> */}
					{routes.map((route, i) => (
						<RouteWithSubRoutes key={i} {...route} />
					))}

					<PageNotFoundRoute />
				</Switch>
			</SellerLayout>
		</>
	);
}

export default SellerIndex;
