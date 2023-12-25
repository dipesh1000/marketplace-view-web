import React from "react";
import Form from "./GigOverviewForm";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {addGigOverview} from "./redux/Action";
import {useHistory} from "react-router";

function GigOverviewAdd() {
	const options = [{value: "desing"}, {value: "new Design"}];
	const initialValue = {
		title: "",
		category: "",
		category_id: "",
		servicetype_id: "",
		gig_metas: [],
		search_tags: [],
		status_id: 4,
	};

	const validationSchema = yup.object({
		title: yup
			.string()
			.required("Title Field is required")
			.max(82, "Title Field must have less than 80 charachters")
			.test(
				"len",
				"Your Title should have at least 4 words",
				val =>
					val?.split(" ").filter(word => {
						return word !== "";
					}).length >= 4
			)
			.test(
				"len",
				"Create a title with 15 characters minimum",
				val => val?.length > 15
			),
		category: yup.string().required("Category is Required"),
		category_id: yup.string().required("Sub Category is Required"),
		servicetype_id: yup.string().nullable(),
		gig_metas: yup.object().nullable(),
		search_tags: yup
			.array()
			.min(1, "Tag list must contain at least 1 tag")
			.max(5, "Tag list must contain at most 5 tag"),
		status_id: yup.number(),
	});
	const dispatch = useDispatch();
	const history = useHistory();
	const handleHistory = slug => {
		history.push(`/users/seller_dashboard/manage_gigs/${slug}/gigs_pricing`);
	};
	const onSubmit = values => {
		// dispatch(showSpinner());
		dispatch(addGigOverview(values, handleHistory));
	};
	const {category, serviceType, searchTag} = useSelector(
		state => state.gigOverview
	);

	// useEffect(() => {
	//   if (loading) {
	//     dispatch(showSpinner());
	//   } else {
	//     dispatch(hideSpinner());
	//   }
	// }, [loading]);

	return (
		<Form
			initialValue={initialValue}
			searchTag={searchTag}
			category={category}
			serviceType={serviceType}
			options={options}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		/>
	);
}

export default React.memo(GigOverviewAdd);
