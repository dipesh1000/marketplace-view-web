import React from "react";
import {Button} from "react-bootstrap";
import {FaCheck, FaPlus} from "react-icons/fa";
import DribbbleLogin from "../../auth/dribbbleAuth/DribbbleLogin";
import GithubLogin from "../../auth/githubAuth/GithubLogin";
import VimeoLogin from "../../auth/vimeoAuth/VimeoLogin";

const NewLinkedAccounts = ({data}) => {
	let googleStatus = data?.linked_accounts?.find(
		p => p.provider_name === "google"
	)
		? true
		: false;
	let facebookStatus = data?.linked_accounts?.find(
		p => p.provider_name === "facebook"
	)
		? true
		: false;
	let githubStatus = data?.linked_accounts?.find(
		p => p.provider_name === "github"
	)
		? true
		: false;
	let vimeoStatus = data?.linked_accounts?.find(
		p => p.provider_name === "vimeo"
	)
		? true
		: false;
	let dribbbleStatus = data?.linked_accounts?.find(
		p => p.provider_name === "dribbble"
	)
		? true
		: false;
	return (
		<div>
			<Button className='conent-item'>
				{googleStatus ? <FaCheck /> : <FaPlus />}
				Google
			</Button>
			<Button className='conent-item'>
				{facebookStatus ? <FaCheck /> : <FaPlus />}
				Facebook
			</Button>
			<Button className='conent-item'>
				{githubStatus ? <FaCheck /> : <GithubLogin />}
				Git Hub
			</Button>
			<Button className='conent-item'>
				{vimeoStatus ? <FaCheck /> : <VimeoLogin />}Vimeo
			</Button>
			<Button className='conent-item'>
				{dribbbleStatus ? <FaCheck /> : <DribbbleLogin />} Dribbble
			</Button>
		</div>
	);
};

export default NewLinkedAccounts;
