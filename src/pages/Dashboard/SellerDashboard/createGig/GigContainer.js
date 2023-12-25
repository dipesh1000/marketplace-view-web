import React from "react";
import {Switch} from "react-router";

import RouteWithSubRoutes from "../../../../navigation/RouteWithSubRoutes";

function GigContainer({routes}) {
	// useEffect(() => {
	//   if (loading) {
	//     dispatch(showSpinner());
	//   } else {
	//     dispatch(hideSpinner());
	//   }
	// }, [loading]);

	return (
		<>
			<Switch>
				{routes.map((route, i) => (
					<RouteWithSubRoutes key={i} {...route} />
				))}
			</Switch>
		</>
	);
}

export default GigContainer;
