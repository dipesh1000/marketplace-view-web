
import {  Route } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound/Index";

const PageNotFoundRoute = ({ ...rest }) => {
  return (
    <Route {...rest}>
      <PageNotFound />
    </Route>
  );
};
export default PageNotFoundRoute;
