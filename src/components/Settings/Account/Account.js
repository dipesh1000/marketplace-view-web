import React from "react";
import SettingsLayout from "../SettingsLayout";
import AccountDeactivation from "./AccountDeactivation";
import AccountDetails from "./AccountDetails";
import "../styles/style.scss";

const Account = () => {
	return (
		<SettingsLayout>
			<AccountDetails />
			<AccountDeactivation />
		</SettingsLayout>
	);
};

export default Account;
