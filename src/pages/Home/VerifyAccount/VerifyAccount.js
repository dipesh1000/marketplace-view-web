import {useEffect} from "react";
import {useHistory, useParams} from "react-router";
import {useDispatch} from "react-redux";
import {userActivation} from "../../../redux/Auth/Auth.action";

export default function VerifyAccount() {
	const history = useHistory();
	const dispatch = useDispatch();
	const {email} = useParams();
	const {token} = useParams();

	useEffect(() => {
		dispatch(userActivation(email, token));
		history.push("/");
		// eslint-disable-next-line
	}, [dispatch]);

	return null;
}
