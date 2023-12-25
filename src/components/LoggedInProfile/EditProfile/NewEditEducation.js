import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Select from "react-select";
import {updateProfileInfo} from "./redux/Action";
import {Brush, Trash} from "react-bootstrap-icons";
import {getCountryList} from "../../../redux/Country/Country.action";
import CreatableSelect from "react-select/creatable";
import {getSuggestion} from "../../../redux/Professional/Professional.action";

const eduTitleList = [
	{id: "Associate", value: "Associate"},
	{id: "B.A.", value: "B.A."},
	{id: "B.Sc.", value: "B.Sc."},
	{id: "M.A.", value: "M.A."},
	{id: "M.B.A.", value: "M.B.A."},
	{id: "M.Sc.", value: "M.Sc."},
	{id: "J.D.", value: "J.D."},
	{id: "M.D.", value: "M.D."},
	{id: "Ph.D.", value: "Ph.D."},
	{id: "BArch", value: "BArch"},
	{id: "BM", value: "BM"},
	{id: "BFA", value: "BFA"},
	{id: "MFA", value: "MFA"},
	{id: "Certificate", value: "Certificate"},
	{id: "LLB", value: "LLB"},
	{id: "LLM", value: "LLM"},
	{id: "Other", value: "Other"},
];

const NewEditEducation = () => {
	const dataList = new Date().getFullYear();
	const years = Array.from(new Array(52), (val, index) => dataList - index);
	const optionsYear = years?.map((year, index) => ({
		label: year,
		value: year,
	}));
	const {data} = useSelector(state => state.editProfile);
	const countries = useSelector(state => state.countryList);
	const {universities} = useSelector(state => state.professionalInfo);
	const [formData, setFormData] = useState([]);
	const [show, setShow] = useState(false);
	const [update, setUpdate] = useState(false);
	const [country, setCountry] = useState();
	const [college, setCollege] = useState();
	const [title, setTitle] = useState();
	const [major, setMajor] = useState();
	const [year, setYear] = useState();

	const [edit, setEdit] = useState();
	const [error, setError] = useState();
	// eslint-disable-next-line
	const [active, setActive] = useState();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCountryList());
		dispatch(getSuggestion());
	}, [dispatch]);

	const onSubmit = () => {
		const values = {
			type: "education",
			education: formData,
		};
		dispatch(updateProfileInfo(values));
		setUpdate(false);
	};

	useEffect(() => {
		data?.professional?.education && setFormData(data.professional.education);
	}, [data?.professional?.education]);

	const handleShow = () => {
		setShow(prev => !prev);
		setCountry();
		setCollege();
		setTitle();
		setMajor();
		setYear();
		setError();
		setEdit(null);
	};

	const handleAdd = () => {
		if (!country || !college || !title || !major || !year) {
			setError("Please Select Required Fields");
			return;
		}
		let value = formData;
		value.push({
			country: country,
			college: college,
			title: title,
			major: major,
			year: year,
		});
		setFormData(value);
		handleShow();
		setUpdate(true);
	};

	const handleEdit = index => {
		setShow(true);
		let data = formData;
		setCountry(data[index].country);
		setCollege(data[index].college);
		setTitle(data[index].title);
		setMajor(data[index].major);
		setYear(data[index].year);
		setEdit(index);
	};

	const handleUpdate = () => {
		if (!country || !college || !title || !major || !year) {
			setError("Please Select All Fields");
			return;
		}
		let value = formData;
		value[edit].country = country;
		value[edit].college = college;
		value[edit].title = title;
		value[edit].major = major;
		value[edit].year = year;
		setFormData(value);
		handleShow();
		setUpdate(true);
	};

	const handleChange = (type, e) => {
		if (type === "country") {
			setCountry(e.value);
		}
		if (type === "college") {
			setCollege(e.value);
		}
		if (type === "title") {
			setTitle(e.value);
		}
		if (type === "major") {
			setMajor(e.target.value);
		}
		if (type === "year") {
			setYear(e.value);
		}
	};

	const handleDelete = index => {
		let value = formData;
		const newValues = value.filter((item, key) => key !== index);
		setFormData(newValues);
		setUpdate(true);
	};

	return (
		<>
			<div className='meta-content-head'>
				<h5>Education</h5>
				<Link to='#'>
					<p onClick={() => handleShow()}>{!show && "Add New"}</p>
				</Link>
			</div>
			<div className='meta-content-body'>
				{show && (
					<div className='form-wrapper'>
						<CustomSelect
							formData={formData}
							name='country'
							type='country'
							handleChange={handleChange}
							value={country}
							placeholder='Country of College/University'
							options={countries?.data?.map(country => {
								return {
									value: country.title,
									label: country.title,
								};
							})}
						/>
						<CollegeSelect
							className='form-select college-select'
							name='college'
							college={college}
							handleChange={handleChange}
							options={universities?.map(university => {
								return {
									value: university,
									label: university,
								};
							})}
						/>
						<div className='education'>
							<CustomSelect
								className='form-select'
								name='title'
								type='title'
								value={title}
								handleChange={handleChange}
								placeholder='Title'
								options={eduTitleList.map(title => {
									return {
										value: title.value,
										label: title.value,
									};
								})}
							/>
							<input
								className='form-input education-input'
								name='major'
								type='text'
								placeholder='Major'
								value={major}
								onChange={e => handleChange("major", e)}
							/>
						</div>
						<CustomSelect
							name='year'
							type='year'
							value={year}
							handleChange={handleChange}
							options={optionsYear}
							placeholder='Year of graduation'
						/>
						<Buttons
							formData={formData}
							setShow={setShow}
							edit={edit}
							active={active}
							handleUpdate={handleUpdate}
							handleAdd={handleAdd}
						/>
					</div>
				)}
				<>
					<div>{error && <span className={`error-message`}>{error}</span>}</div>
					<DataTable
						handleEdit={handleEdit}
						handleDelete={handleDelete}
						formData={formData}
					/>
					<UpdateButton update={update} onSubmit={onSubmit} />
				</>
			</div>
		</>
	);
};

export default NewEditEducation;

const CustomSelect = ({
	name,
	value,
	type,
	options,
	handleChange,
	placeholder,
}) => {
	return (
		<>
			<Select
				name={name}
				options={options}
				placeholder={placeholder}
				value={value ? {value: value, label: value} : null}
				onChange={e => handleChange(type, e)}
			/>
		</>
	);
};

const CollegeSelect = ({options, handleChange, college, name}) => {
	return (
		<>
			<CreatableSelect
				className='creatableField'
				name={name}
				options={options}
				value={college ? {value: college, label: college} : null}
				onChange={e => handleChange("college", e)}
				placeholder='College/University Name'
			/>
		</>
	);
};

const DataTable = ({formData, handleEdit, handleDelete}) => {
	return (
		<>
			{formData?.map((item, index) => (
				<React.Fragment key={index}>
					<div className='content-level'>
						<p className='level-text'>{item.title}</p>
						&nbsp;&nbsp;-
						<span>{item.major}</span>
						<div className='ml-2 edit-delete-icons'>
							<Brush onClick={() => handleEdit(index)} title='Edit' />
							{formData?.length > 1 ? (
								<Trash
									className='ml-2'
									onClick={() => handleDelete(index)}
									title='Delete'
								/>
							) : null}
						</div>
					</div>
					<div className='baseLevel'>
						<span>
							{item.college}, {item.country}, Graduated {item.year}
						</span>
					</div>
				</React.Fragment>
			))}
		</>
	);
};

const Buttons = ({setShow, edit, active, handleUpdate, handleAdd}) => {
	return (
		<div className='buttons'>
			<div
				className='btn-lrg-standard btn-white cancel'
				value='Cancel'
				onClick={() => setShow(false)}
			>
				Cancel
			</div>
			{edit !== null ? (
				<button
					type='button'
					className={`btn-lrg-standard add ${active ? "incomplete" : ""}`}
					onClick={() => handleUpdate()}
					disabled={active}
				>
					Edit
				</button>
			) : (
				<button
					type='button'
					className={`btn-lrg-standard add ${active ? "incomplete" : ""}`}
					onClick={() => handleAdd()}
					disabled={active}
				>
					Add
				</button>
			)}
		</div>
	);
};

const UpdateButton = ({update, up, onSubmit}) => {
	return (
		<>
			{(update || up) && (
				<div className='submit-button'>
					<button
						type='submit'
						className='btn-lrg-standard add'
						value='Update'
						onClick={() => onSubmit()}
					>
						Update
					</button>
				</div>
			)}
		</>
	);
};
