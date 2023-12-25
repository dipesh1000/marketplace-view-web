import {ErrorMessage, Field} from "formik";
import React, {useEffect, useState} from "react";
import {Col, Nav, Row, Tab} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {axiosInstance} from "../../../../utils/AxiosInstance";
import {hideSpinner} from "../../../common/Spinner/redux/Action";

function GigMetaTab({
	CustomCheckbox,
	CustomHiddenInput,
	CustomRadio,
	CustomSelect,
	field,
}) {
	const dispatch = useDispatch();
	const [globalGigMeta, setGlobalGigMeta] = useState([]);
	useEffect(() => {
		if (field.value.servicetype_id) {
			// dispatch(showSpinner());
			axiosInstance()
				.get(`api/seller/categorygigmeta/${field.value.servicetype_id}`)
				.then(res => {
					dispatch(hideSpinner());
					if (res.data?.data?.categorygigmetas.length > 0) {
						setGlobalGigMeta(res.data?.data?.categorygigmetas);
					} else {
						axiosInstance()
							.get(`api/seller/categorygigmeta/${field.value.category_id}`)
							.then(res => {
								setGlobalGigMeta(res.data?.data?.categorygigmetas);
							});
					}
				})
				.catch(err => {
					// dispatch(hideSpinner());
				});
		} else if (field.value.category_id) {
			// dispatch(showSpinner());
			axiosInstance()
				.get(`/api/seller/categorygigmeta/${field.value.category_id}`)
				.then(res => {
					setGlobalGigMeta(res.data?.data?.categorygigmetas);
					dispatch(hideSpinner());
				})
				.catch(err => {
					// dispatch(hideSpinner());
				});
		}
	}, [dispatch, field.value.category_id, field.value.servicetype_id]);

	return (
		<>
			{globalGigMeta?.length > 0 && field.value.category_id && (
				<div className='d-flex justify-content-between '>
					<div className='label'>Gig Meta</div>
					<div className='tab'>
						<Tab.Container id='left-tabs-example' defaultActiveKey='0'>
							<Row noGutters>
								<Col sm={4}>
									<Nav variant='pills' className='flex-column'>
										{globalGigMeta?.map((item, index) => (
											<Nav.Item key={item.id}>
												<Nav.Link eventKey={index}>
													{item.title}{" "}
													{item.rule.is_required === 1 ? (
														<span style={{color: "red", fontWeight: "bolder"}}>
															*
														</span>
													) : (
														""
													)}
												</Nav.Link>
											</Nav.Item>
										))}
									</Nav>
								</Col>
								<Col sm={8}>
									<Tab.Content>
										{globalGigMeta?.map((item, index) => (
											<Tab.Pane eventKey={index} key={item.id}>
												<div className='title'>{item.description}</div>
												<CustomHiddenInput
													name={`gig_metas[${index}]['global']`}
													value={item.id}
												/>
												<CustomHiddenInput
													name={`gig_metas[${index}]['category_gig_meta']`}
													value={item.rule.id}
												/>

												{item.rule.selection_type === "Radio" && (
													<Field
														component={RadioBox}
														index={index}
														CustomRadio={CustomRadio}
														item={item}
													/>
												)}
												{item.rule.selection_type === "Checkbox" && (
													<Field
														component={Checkbox}
														index={index}
														CustomCheckbox={CustomCheckbox}
														item={item}
													/>
												)}

												{item.rule.selection_type === "Select" && (
													<>
														<Field
															component={Selectbox}
															index={index}
															CustomSelect={CustomSelect}
															options={item.content.map(item => {
																return {id: item.id, value: item.title};
															})}
															item={item}
														/>
													</>
												)}
											</Tab.Pane>
										))}
									</Tab.Content>
								</Col>
							</Row>
						</Tab.Container>
					</div>
				</div>
			)}
		</>
	);
}

export default GigMetaTab;

const RadioBox = ({CustomRadio, form, item, index}) => {
	const validateRadio = value => {
		let error;
		if (item.rule.is_required === 1) {
			if (!value) {
				error = "Required";
			}
		}
		return error;
	};

	return (
		<>
			<ErrorMessage
				name={`gig_metas[${index}]['values'][0]`}
				render={msg => <span className='error-message'>{msg}</span>}
			/>

			{item?.content?.map(list => (
				<CustomRadio
					key={list.id}
					name={`gig_metas[${index}]['values'][0]`}
					label={list.title}
					value={list.id}
					content={list.id}
					validate={validateRadio}
				/>
			))}
		</>
	);
};

const Checkbox = ({CustomCheckbox, form, item, index}) => {
	const validateCheckbox = value => {
		let error;
		if (item.rule.is_required) {
			if (!value) {
				error = "Required";
			}
		}
		if (item.rule.is_required && item.rule.minimum_selection) {
			if (value?.length < item.rule.minimum_selection) {
				error = `Select ${item.rule.minimum_selection} Field`;
			}
		}

		return error;
	};
	return (
		<>
			<ErrorMessage
				name={`gig_metas[${index}]['values']`}
				render={msg => <span className='error-message'>{msg}</span>}
			/>
			{item?.content?.map(list => (
				<CustomCheckbox
					value={list.id}
					name={`gig_metas[${index}]['values']`}
					label={list.title}
					key={list.id}
					content={list.id}
					validate={validateCheckbox}
				/>
			))}
		</>
	);
};

const Selectbox = ({CustomSelect, options, index, item}) => {
	const validateSelect = value => {
		let error;
		if (item.rule.is_required === 1) {
			if (!value) {
				error = "Required";
			}
		}
		return error;
	};

	return (
		<>
			<ErrorMessage
				name={`gig_metas[${index}]['values']`}
				render={msg => <span className='error-message'>{msg}</span>}
			/>
			<CustomSelect
				name={`gig_metas[${index}]['values']`}
				options={options}
				validate={validateSelect}
			/>
		</>
	);
};
