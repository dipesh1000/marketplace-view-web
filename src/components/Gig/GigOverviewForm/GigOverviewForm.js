import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useForm} from "../../common/form/useForm";
import "./style/GigOverview.scss";
import {Field} from "formik";
import {makeStyles} from "@material-ui/core";
import GigMetaTab from "./component/GigMetaTab";
import GigTitle from "./component/GigTitle";
import Category from "./component/Category";

const useStyles = makeStyles({
	errorMessage: {
		fontSize: "12px",
		color: "red",
	},
});

function GigOverviewForm({
	initialValue,
	validationSchema,
	category,
	serviceType,
	search_tags,
	onSubmit,
	searchTag,
}) {
	// eslint-disable-next-line
	const classes = useStyles();
	const [data, setData] = useState();
	// const [id, setId] = useState();
	//   const handleSet = (val) => {
	//     setId(val);
	//   };
	// const findCategory = (id) => {
	//   const resultcategory =
	//     category
	//       ?.filter((item) => item.parent_id == id)
	//       .map((item) => {
	//         return { id: item.id, value: item.title };
	//       });
	//   return resultcategory;
	// };
	// const findServiceType = (id) => {
	//   const resultcategory =
	//     // id &&
	//     serviceType &&
	//     serviceType
	//       .filter((item) => item.parent_id == id)
	//       .map((item) => {
	//         return { id: item.id, value: item.title };
	//       });
	//   return resultcategory;
	// };
	const primaryCategory =
		category &&
		category
			.filter(item => item.parent_id == null)
			.map(item => {
				return {id: item.id, value: item.title};
			});
	const suggestion =
		searchTag &&
		searchTag.map(item => {
			return {id: item.id, value: item.tag};
		});
	// const [secondaryCategory, setSecondaryCategory] = useState();
	// const [serviceTypes, setServiceTypes] = useState([]);

	let initialValues = data ? data : initialValue;
	const {
		CustomForm,
		CustomInputTags,
		CustomCheckbox,
		CustomRadio,
		CustomHiddenInput,
		CustomSelect,
		CustomTextarea,
	} = useForm({initialValues, validationSchema, onSubmit});

	// eslint-disable-next-line
	const [secondId, setSecondId] = useState();
	// eslint-disable-next-line
	const handleSecondSet = val => {
		val && setSecondId(val);
	};
	// useEffect(() => {

	//   setSecondaryCategory(findCategory(id));
	//   secondId && setServiceTypes(findServiceType(secondId));
	//   secondId && dispatch(fetchCategoryGigMeta(secondId));
	// }, [id, secondId]);

	function onKeyDown(keyEvent) {
		if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
			keyEvent.preventDefault();
		}
	}
	return (
		<div className='overview'>
			<CustomForm onKeyDown={onKeyDown}>
				<div className='overview-wrapper'>
					<div className='d-flex justify-content-between '>
						<div className='label'>Gig Title</div>
						<Row className='row'>
							<Col sm={12}>
								<Field component={GigTitle} CustomTextarea={CustomTextarea} />
							</Col>
						</Row>
					</div>
					<Field
						component={Category}
						options={primaryCategory}
						// handleSet={handleSet}
						category={category}
						serviceType={serviceType}
					/>

					<Field
						component={GigMetaTab}
						CustomHiddenInput={CustomHiddenInput}
						CustomCheckbox={CustomCheckbox}
						CustomRadio={CustomRadio}
						CustomSelect={CustomSelect}
						// handleSecondSet={handleSecondSet}
						setData={setData}
					/>

					<div className='d-flex justify-content-between mt-4'>
						<div className='label'>Search Tags</div>
						<Row className='row'>
							<Col sm={12}>
								<CustomInputTags
									search_tags={search_tags}
									setData={setData}
									suggestion={suggestion}
									placeholder='Add Tags separated by comma'
									helperText='5 tags maximum. Use letters and numbers only.'
									name='search_tags'
								/>
							</Col>
						</Row>
					</div>
					{/* <div className="extra-description">
							<span>
							<i className="fa fa-info-circle"></i> Please Note: &nbsp;
							</span>
							Some categories require that sellers verify their skills.
						</div> */}
				</div>
				<div className='d-flex justify-content-between mt-4'>
					<Link to='/users/seller_dashboard/gigs' className='custom-btn cancel'>
						Cancel
					</Link>
					<button type='submit' className='custom-btn successBtn'>
						Save & Continue
					</button>
				</div>
			</CustomForm>
		</div>
	);
}

export default React.memo(GigOverviewForm);
