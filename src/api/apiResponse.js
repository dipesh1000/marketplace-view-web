import { hideSpinner } from "../components/common/Spinner/redux/Action";
import { authError } from "../redux/Auth/Auth.action";
import { returnErrors } from "../redux/Error/Error.action";
import Store from "../redux/store";
import { returnSuccess } from "../redux/Success/Success.action";

export function handleError(error) {
  // Unauthenticated;
  // const history = useHistory();

  if (error.toJSON().message === "Network Error") {
    alert("no internet connection");
    // dispatch({type: RELOAD});
  } else if (error?.response?.data?.message === "Unauthenticated.") {
    // return history.push('/');
    Store.dispatch(authError());
    window.location.replace("/");
  }
  Store.dispatch(hideSpinner());
  Store.dispatch(
    returnErrors(
      error.response?.data || { message: "Error Occurred", code: "400" }
    )
  );
  throw error;
}

export function handleResponse(response) {
  Store.dispatch(returnSuccess(response.data));
  return response;
}
