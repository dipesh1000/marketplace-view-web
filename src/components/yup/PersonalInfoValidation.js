import * as yup from "yup";

// const FILE_SIZE = 0.1 * 1024 * 1024  ;
// const SUPPORTED_FORMATS = [
//     "image/jpg",
//     "image/jpeg",
//     "image/png"
// ];
export const PersonalInfoValidation = yup.object().shape({
	first_name: yup
		.string()
		.min(2, "*First Name must have at least 2 characters")
		.max(50, "*First Name  can't be longer than 100 characters")
		.required("*First Name  is required"),

	last_name: yup
		.string()
		.min(2, "*Last Name  must have at least 2 characters")
		.max(70, "*Last Name  can't be longer than 100 characters")
		.required("*Last Name  is required"),

	description: yup
		.string()
		.min(150, "*Please Enter 150 characters")
		.max(600, "*Please Enter less then 600 characters")
		.required("*Description  is required"),

	country: yup.string().required("*Country is required"),

	// profile_image: yup.mixed()
	// .required("Your Profile Image is required"),
	// .when("value", {
	// is: (val) => val != null,
	// then: yup.mixed().test('fileSize', "FileSize is not applicable",
	// value => value &&  value.size <= FILE_SIZE),
	// otherwise: yup.mixed().nullable()
	// }),
	// .test(
	//     "fileFormat",
	//     "Unsupported Format",
	//     value => value && SUPPORTED_FORMATS.includes(value.type)
	// ),
	language: yup
		.array()
		.of(
			yup.object().shape({
				value: yup
					.string()
					.required("Title is Required")
					.max(120, "Title must be less than 120 Charachters"),
				proficiency: yup
					.string()
					.required("Description is Required")
					.max(300, "Description must be less than 300 Charachters"),
			})
		)
		.min(1, "Set Atleast 1 language"),
});
