import React from "react";
import {useSelector} from "react-redux";
import NewEditLanguage from "./EditProfile/NewEditLanguage";
import NewEditSkills from "./EditProfile/NewEditSkills";
import NewEditEducation from "./EditProfile/NewEditEducation";
import NewEditCertification from "./EditProfile/NewEditCertification";
import NewLinkedAccounts from "./EditProfile/NewLinkedAccounts";
import NewEditDescription from "./EditProfile/NewEditDescription";

function MetaContent() {
	const {data} = useSelector(state => state.editProfile);

	return (
		<div className='meta-content'>
			<NewEditDescription />
			<hr />
			<NewEditLanguage />
			<hr />
			<div className='meta-content-head'>
				<h5>Linked Accounts</h5>
			</div>
			<div className='meta-content-body'>
				<NewLinkedAccounts data={data} />
			</div>
			<hr />
			<NewEditSkills />
			<hr />
			<NewEditEducation />
			<hr />
			<NewEditCertification />
		</div>
	);
}

export default MetaContent;
