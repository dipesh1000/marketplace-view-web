import React, {useEffect, useState} from "react";
import {Field} from "formik";
import {useForm} from "../../common/form/useForm";
import SettingsLayout from "../SettingsLayout";
import {useSelector, useDispatch} from "react-redux";
import * as Yup from "yup";
import {getCountryList} from "../../../redux/Country/Country.action";
import ButtonSpinner from "../../common/ButtonSpinner/ButtonSpinner";

const Billing = () => {
	const dispatch = useDispatch();
	const {postLoading} = useSelector(state => state.checkout);

	const initialValues = {
		fullName: "",
		companyName: "",
		country: "",
		state: "",
		address: "",
		city: "",
		postalCode: "",
		VatNumber: "",
		invoices: "",
		email: "",
	};

	const countryList = useSelector(state => state.countryList);

	const allCountryList = countryList?.data?.map(item => ({
		id: item.code,
		value: item.title,
	}));

	useEffect(() => {
		dispatch(getCountryList());
	}, [dispatch]);

	const handleChange = (form, e) => {
		form.setFieldValue("country", e.value);
	};

	const onSubmit = values => {
		console.log(values);
	};

	const validationSchema = Yup.object({
		fullName: Yup.string().required(),
		companyName: Yup.string().required(),
		country: Yup.string(),
		state: Yup.string().required(),
		address: Yup.string().required(),
		city: Yup.string().required(),
		postalCode: Yup.string().required(),
		VatNumber: Yup.string().required(),
		invoices: Yup.string(),
		email: Yup.string().email(),
	});

	const {CustomInput, CustomForm, CustomSelect, CustomCheckbox} = useForm({
		initialValues,
		validationSchema,
		onSubmit,
	});
	return (
		<SettingsLayout>
			<CustomForm>
				<div className='billing-info'>
					<div className='field'>
						<span className='field-title'>Full name</span>
						<div className='field-input'>
							<CustomInput name='fullName' type='text' />
						</div>
					</div>
					<div className='field'>
						<span className='field-title'>Company name</span>
						<div className='field-input'>
							<CustomInput name='companyName' type='text' />
						</div>
					</div>
					<div className='field'>
						<span className='field-title'>Country</span>
						<div className='field-select'>
							<Field
								name='country'
								component={CustomSelect}
								handleChange={handleChange}
								options={allCountryList}
							/>
						</div>
					</div>
					<div className='field'>
						<span className='field-title'>State/Province/Territory</span>
						<div className='field-input'>
							<CustomInput name='state' type='text' />
						</div>
					</div>
					<div className='field'>
						<span className='field-title'>Address</span>
						<div className='field-input'>
							<CustomInput
								name='address'
								type='text'
								placeholder='Street or POB'
							/>
						</div>
					</div>
					<div className='city-details'>
						<div className='field'>
							<span className='field-title'>City</span>
							<div className='field-input'>
								<CustomInput name='city' type='text' />
							</div>
						</div>
						<div className='field'>
							<span className='field-title'>Postal Code</span>
							<div className='field-input'>
								<CustomInput name='postalCode' type='text' />
							</div>
						</div>
					</div>
					<div className='field'>
						<span className='field-title'>VAT number</span>
						<div className='field-input'>
							<CustomInput name='VatNumber' type='text' />
						</div>
					</div>
					<div className='field'>
						<span className='field-title'>
							Invoices <i className='fa fa-question-circle'></i>
						</span>
						<div className='field-checkbox'>
							<CustomCheckbox name='invoices' />
							<label>Yes, email my billing info and original invoices.</label>
						</div>
					</div>
					<Field component={EmailCheck} CustomInput={CustomInput} />
					<div className='form-button-container'>
						<button className='form-button' type='submit'>
							{postLoading && <ButtonSpinner />} Save Changes
						</button>
					</div>
				</div>
			</CustomForm>
		</SettingsLayout>
	);
};

export default Billing;

// const CustomSelect = ({name, handleChange, options, form}) => {
// 	return (
// 		<>
// 			<Select
// 				name={name}
// 				placeholder='Select a country'
// 				options={options.map(country => ({
// 					value: country.value,
// 					label: country.value,
// 				}))}
// 				value={
// 					form.values.country
// 						? {value: form.values.country, label: form.values.country}
// 						: null
// 				}
// 				onChange={e => handleChange(form, e)}
// 			/>
// 		</>
// 	);
// };

const EmailCheck = ({form, CustomInput}) => {
	const [show, setShow] = useState(false);
	useEffect(() => {
		if (form.values["invoices"]) {
			setShow(true);
		} else {
			setShow(false);
		}
	}, [form.values]);
	return (
		show && (
			<div className='field'>
				<span className='field-title'>Enter your email address</span>
				<div className='field-input'>
					<CustomInput name='email' type='email' />
				</div>
			</div>
		)
	);
};
