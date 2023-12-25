import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {getLanguageList} from "../../../redux/language/Language.action";
import Select from "react-select";
import {updateProfileInfo} from "./redux/Action";
import {Brush, Trash} from "react-bootstrap-icons";
import {Form} from "react-bootstrap";

const NewEditLanguage = () => {
	const {data} = useSelector(state => state.editProfile);
	const [formData, setFormData] = useState([]);
	const {language, proficiency} = useSelector(state => state.lang);
	const [show, setShow] = useState(false);
	const [update, setUpdate] = useState(false);
	const [options, setOptions] = useState([]);
	const [lang, setLang] = useState();
	const [prof, setProf] = useState();
	const [edit, setEdit] = useState();
	const [error, setError] = useState();
	// eslint-disable-next-line
	const [active, setActive] = useState();
	const dispatch = useDispatch();

	const onSubmit = () => {
		const values = {
			type: "language",
			language: formData,
		};
		dispatch(updateProfileInfo(values));
		setUpdate(false);
	};

	useEffect(() => {
		data?.personal?.language && setFormData(data.personal.language);
	}, [data?.personal?.language]);

	useEffect(() => {
		dispatch(getLanguageList());
	}, [dispatch]);

	useEffect(() => {
		let optionData = language || [];
		optionData = optionData.reduce(function(result, option) {
			let valid = true;
			formData?.map((initial, index) => {
				if ((index !== edit && initial.value) === option.title) {
					valid = false;
				}
				return null;
			});
			if (valid) {
				return result.concat({
					value: option.title,
					label: option.title,
				});
			}
			return result;
		}, []);

		setOptions(optionData);
		// eslint-disable-next-line
	}, [formData, show, edit]);

	const handleShow = () => {
		setShow(prev => !prev);
		setLang();
		setProf(proficiency[Object.keys(proficiency)[0]]);
		setError();
		setEdit(null);
	};

	const handleAdd = () => {
		if (!lang || !prof) {
			setError("Please Select Required Fields");
			return;
		}
		let value = formData;
		value.push({value: lang, proficiency: prof});
		setFormData(value);
		handleShow();
		setUpdate(true);
	};

	const handleEdit = index => {
		setShow(true);
		let data = formData;
		setLang(data[index].value);
		setProf(data[index].proficiency);
		setEdit(index);
	};

	const handleUpdate = () => {
		if (!lang || !prof) {
			setError("Please Select All Fields");
			return;
		}
		let value = formData;
		value[edit].value = lang;
		value[edit].proficiency = prof;
		setFormData(value);
		handleShow();
		setUpdate(true);
	};

	const handleChange = (type, e) => {
		if (type === "language") {
			setLang(e.value);
		}
		if (type === "proficiency") {
			setProf(e.target.value);
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
				<h5>Language</h5>
				<Link to='#'>
					<p onClick={() => handleShow()}>{!show && "Add New"}</p>
				</Link>
			</div>
			<div className='meta-content-body'>
				{show && (
					<div className='form-wrapper'>
						<CustomSelect
							formData={formData}
							name='languages'
							handleChange={handleChange}
							lang={language}
							language={lang}
							options={options}
						/>

						<NormalSelect
							formData={formData}
							name='proficency'
							lang={proficiency}
							handleChange={handleChange}
							proficiency={prof}
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

export default NewEditLanguage;

const CustomSelect = ({name, language, options, handleChange}) => {
	return (
		<>
			<Select
				name={name}
				options={options}
				value={language ? {value: language, label: language} : null}
				onChange={e => handleChange("language", e)}
				placeholder='Select a language'
			/>
		</>
	);
};

const NormalSelect = ({name, lang, proficiency, handleChange}) => {
	return (
		<Form.Control
			as='select'
			name={name}
			onChange={e => handleChange("proficiency", e)}
			value={proficiency}
		>
			{lang &&
				Object.keys(lang).map(key => (
					<option value={lang[key]} key={key}>
						{lang[key]}
					</option>
				))}
		</Form.Control>
	);
};

const DataTable = ({formData, handleEdit, handleDelete}) => {
	return (
		<>
			{formData?.map((item, index) => (
				<div className='content-level' key={index}>
					<p>{item.value}</p>
					&nbsp;&nbsp; -<span>{item.proficiency}</span>
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
