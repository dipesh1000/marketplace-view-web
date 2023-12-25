import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {useForm} from "../../common/form/useForm";
import styles from "./styles.module.css";
import OccupationForm from "./components/OccupationForm";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Certification from "./components/Certification";
import {Field} from "formik";
import {makeStyles} from "@material-ui/core";
import {ErrorMessage} from "formik";
import ButtonSpinner from "../../common/ButtonSpinner/ButtonSpinner";
import FocusError from "../../../utils/FocusError";

const useStyles = makeStyles({
	errorMessage: {
		fontSize: "12px",
		color: "red",
	},
});

function ProfessionalInfoForm({
	initialValue,
	validationSchema,
	onSubmit,
	postLoading,
	skillLevels,
	countryList,
	skillSuggestion,
	universitiesSuggestion,
}) {
	const [newInitialValue, setNewInitialvalue] = useState();
	// eslint-disable-next-line
	const classes = useStyles();

	useEffect(() => {
		if (initialValue) {
			setNewInitialvalue(initialValue);
		}
	}, [initialValue]);

	const {CustomSellerInput, CustomForm} = useForm({
		initialValues: newInitialValue ?? initialValue,
		validationSchema,
		onSubmit,
	});

	return (
		<>
			<div className={styles.FormInnerContainer}>
				<h2>Professional Info</h2>
				<p>
					Tell us a bit about yourself. This information will appear on your
					public profile, so that potential buyers can get to know you better.
				</p>
				<i className='text-right'>* Mandatory fields</i>
				<hr className='mt-0' />
				<CustomForm>
					<Row className='pb-5 pt-4'>
						<Col md={4} className='pt-1'>
							<span className={styles.formLevels}>
								Your Occupation <b>*</b>
							</span>
						</Col>
						<Col md={8}>
							<Field
								component={OccupationForm}
								newInitialValue={newInitialValue}
								setNewInitialvalue={setNewInitialvalue}
							/>
						</Col>
					</Row>
					{/* <div style={{height: "30px"}} /> */}
					<Row className='pb-5 pt-5'>
						<Col md={4} className='pt-1'>
							<span className={styles.formLevels}>
								Skills <b>*</b>
							</span>
						</Col>
						<Col md={8}>
							<Field
								component={Skills}
								CustomSellerInput={CustomSellerInput}
								newInitialValue={newInitialValue}
								setNewInitialvalue={setNewInitialvalue}
								skillSuggestion={skillSuggestion}
							/>
						</Col>
					</Row>
					<Row className='pb-5 pt-5'>
						<Col md={4} className='pt-1'>
							<span className={styles.formLevels}>Education </span>
						</Col>
						<Col md={8}>
							<Field component={Education} />
						</Col>
					</Row>
					<Row className='pb-5 pt-5'>
						<Col md={4} className='pt-1'>
							<span className={styles.formLevels}>Certification </span>
						</Col>
						<Col md={8}>
							<Field component={Certification} />
						</Col>
					</Row>
					<Row className='pb-5 pt-5'>
						<Col md={4} className='pt-1'>
							<span className={styles.formLevels}>Personal Website</span>
						</Col>
						<Col md={8}>
							<CustomSellerInput
								name='personal_website'
								placeholder='Provide a link to your own professional website'
							/>
							<ErrorMessage
								name='personal_website'
								render={msg => (
									<span className={`${styles.errorMsg} error-message`}>
										{msg}
									</span>
								)}
							/>
						</Col>
					</Row>
					<div className={`pb-5 pt-5 ${styles.buttonEdu}`}>
						<button type='submit' className={styles.formSubmit}>
							{postLoading && <ButtonSpinner />}
							Continue
						</button>
					</div>
					<FocusError />
				</CustomForm>
			</div>
		</>
	);
}

export default React.memo(ProfessionalInfoForm);
