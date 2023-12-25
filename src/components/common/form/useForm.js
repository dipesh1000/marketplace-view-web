import {makeStyles} from "@material-ui/core/styles";
import {Field, Form, Formik, useFormik} from "formik";
import React from "react";
import Checkbox from "./CustomCheckbox";
import Input from "./CustomInput";
import Radio from "./CustomRadio";
import Select from "./CustomSelect";
import CustomMultipleSelect from "./CustomMultipleSelect";
import Upload from "./CustomUpload";
import Textarea from "./CustomTextarea";
import TextEditor from "./CustomTextEditor";
import NestedSelect from "./CustomNestedSelect";
import InputTags from "./CustomInputTags";
import HiddenInput from "./HiddenInput";
import SellerSelect from "./CustomSellerSelect";
import SellerCheckbox from "./CustomSellerCheckbox";
import SellerInput from "./CustomSellerInput";
import TypeHead from "./CustomTypeHead";
import PhoneNumber from "./CustomPhoneNumber";
import SelectTwo from "./SelectTwoInput";

const useStyles = makeStyles(theme => ({
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
}));
export const useForm = ({initialValues, onSubmit, validationSchema}) => {
	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: onSubmit,
	});
	const CustomInput = props => {
		return <Field {...props} component={Input} />;
	};
	const CustomHiddenInput = props => {
		return <Field props={props} component={HiddenInput} />;
	};
	const CustomRadio = props => {
		return <Field {...props} component={Radio} />;
	};
	const CustomCheckbox = props => {
		return <Field {...props} component={Checkbox} />;
	};
	const CustomNestedSelect = props => {
		return <Field {...props} component={NestedSelect} />;
	};
	const CustomUpload = props => {
		return <Field {...props} component={Upload} />;
	};
	const CustomInputTags = props => {
		return <Field {...props} component={InputTags} />;
	};
	const CustomSelect = props => {
		return <Field {...props} component={Select} />;
	};
	const CustomTextarea = props => {
		return <Field {...props} component={Textarea} />;
	};

	const CustomTextEditor = props => {
		return <Field {...props} component={TextEditor} />;
	};
	const CustomSellerSelect = props => {
		return <Field {...props} component={SellerSelect} />;
	};
	const CustomSellerCheckbox = props => {
		return <Field {...props} component={SellerCheckbox} />;
	};
	const CustomSellerInput = props => {
		return <Field {...props} component={SellerInput} />;
	};
	const CustomTypeHead = props => {
		return <Field {...props} component={TypeHead} />;
	};
	const CustomPhoneNumber = props => {
		return <Field {...props} component={PhoneNumber} />;
	};

	const SelectTwoInput = props => {
		return <Field {...props} component={SelectTwo} />;
	};

	const CustomForm = ({children, onKeyDown, ...others}) => {
		return (
			<Formik
				validationSchema={validationSchema}
				initialValues={initialValues}
				onSubmit={onSubmit}
				enableReinitialize
			>
				{errors => (
					<Form onKeyDown={onKeyDown && onKeyDown} errors={errors}>
						{children}
					</Form>
				)}
			</Formik>
			//  <form
			//    {...others}
			//    className={classes.form}
			//    onSubmit={formik.handleSubmit}
			//    encType="multipart/form-data"
			//  >
			//    {children}
			//  </form>
		);
	};

	return {
		formik,
		CustomForm,
		CustomHiddenInput,
		CustomInput,
		CustomInputTags,
		CustomNestedSelect,
		CustomUpload,
		CustomSelect,
		CustomRadio,
		CustomCheckbox,
		CustomMultipleSelect,
		CustomTextarea,
		CustomSellerSelect,
		CustomSellerCheckbox,
		CustomSellerInput,
		CustomPhoneNumber,
		SelectTwoInput,
		CustomTextEditor,
		CustomTypeHead,
	};
};

export const CustomForm = React.memo(({children, formik, ...others}) => {
	const classes = useStyles();
	return (
		<form
			{...others}
			className={classes.form}
			onSubmit={formik.handleSubmit}
			encType='multipart/form-data'
		>
			{children}
		</form>
	);
});
