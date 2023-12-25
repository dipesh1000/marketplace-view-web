import {useSelector} from "react-redux";
import {Route} from "react-router";

function RouteWithSubRoutes(route) {
	const {user} = useSelector(state => state.auth);
	return (
		<Route
			path={route.path}
			render={props =>
				// pass the sub-routes down to keep nesting
				route?.role ? (
					route.role === user?.role ? (
						<route.component {...props} routes={route.routes} />
					) : user?.role === "seller" && route.role === "buyer" ? (
						<route.component {...props} routes={route.routes} />
					) : // <PageNotFound />
					null
				) : (
					<route.component {...props} routes={route.routes} />
				)
			}
		/>
	);
}

export default RouteWithSubRoutes;
