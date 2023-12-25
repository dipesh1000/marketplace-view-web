import React from "react";
import { Switch } from "react-router-dom";
import PageNotFoundRoute from "../../navigation/PageNotFound";
import routes from "../../navigation/routes";
import RouteWithSubRoutes from "../../navigation/RouteWithSubRoutes";

export default function HomeIndex() {
  return (
    <>
      {/* <HomeLayout> */}
      <Switch>
        {routes.home.map((route, index) => (
          <RouteWithSubRoutes key={index} {...route} />
        ))}
        <PageNotFoundRoute />
      </Switch>
      {/* </HomeLayout> */}
    </>
  );
}
