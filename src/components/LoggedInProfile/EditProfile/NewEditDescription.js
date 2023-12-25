import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {useForm} from "../../common/form/useForm";
import * as Yup from "yup";
import {updateProfileInfo} from "./redux/Action";
import {profileFetch} from "../../../redux/Profile/Profile.action";

const NewEditDescription = () => {
	const dispatch = useDispatch();
	const {data} = useSelector(state => state.editProfile);
	const [show, setShow] = useState(false);

	const initialValues = {
		type: "description",
		description: data?.personal?.description || "",
	};

	const validationSchema = Yup.object({
		description: Yup.string().required(),
	});

	const handleProfileUpdate = () => {
		dispatch(profileFetch());
	};

	const onSubmit = values => {
		dispatch(updateProfileInfo(values, handleProfileUpdate));
		setShow(false);
	};

	const {CustomTextarea, CustomForm} = useForm({
		initialValues,
		validationSchema,
		onSubmit,
	});
	return (
		<CustomForm>
			<div className='meta-content-head'>
				<h5>Description</h5>
				<Link to='#'>
					<p onClick={() => setShow(true)}>Edit Description</p>
				</Link>
			</div>
			<div className='meta-content-body'>
				{show ? (
					<div className='form-wrapper'>
						<CustomTextarea name='description' className='textarea' rows={5} />
						<div className='buttons'>
							<button
								type='button'
								class='btn-lrg-standard btn-white cancel'
								value='Cancel'
								onClick={() => setShow(false)}
							>
								Cancel
							</button>
							<button
								type='submit'
								class='btn-lrg-standard update'
								value='Update'
							>
								Update
							</button>
						</div>
					</div>
				) : (
					<p className='meta-desc'>{data?.personal?.description}</p>
				)}
			</div>
		</CustomForm>
	);
};

export default NewEditDescription;
