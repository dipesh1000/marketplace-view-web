import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Select from "react-select";
import {updateProfileInfo} from "./redux/Action";
import {Brush, Trash} from "react-bootstrap-icons";
import CreatableSelect from "react-select/creatable";

const NewEditSkills = () => {
	const {data} = useSelector(state => state.editProfile);
	const {skills} = useSelector(state => state.professionalInfo);
	const [formData, setFormData] = useState([]);
	const [show, setShow] = useState(false);
	const [update, setUpdate] = useState(false);
	const [skill, setSkill] = useState();
	const [experience, setExperience] = useState();
	const [edit, setEdit] = useState();
	const [error, setError] = useState();
	// eslint-disable-next-line
	const [active, setActive] = useState();
	const dispatch = useDispatch();

	const onSubmit = () => {
		const values = {
			type: "skills",
			skills: formData,
		};
		dispatch(updateProfileInfo(values));
		setUpdate(false);
	};

	useEffect(() => {
		data?.professional?.skills && setFormData(data.professional.skills);
	}, [data?.professional?.skills]);

	const handleShow = () => {
		setShow(prev => !prev);
		setSkill();
		setExperience("Beginner");
		setError();
		setEdit(null);
	};

	const handleAdd = () => {
		if (!skill || !experience) {
			setError("Please Select Required Fields");
			return;
		}
		let value = formData;
		value.push({name: skill, level: experience});
		setFormData(value);
		handleShow();
		setUpdate(true);
	};

	const handleEdit = index => {
		setShow(true);
		let data = formData;
		setSkill(data[index].name);
		setExperience(data[index].level);
		setEdit(index);
	};

	const handleUpdate = () => {
		if (!skill || !experience) {
			setError("Please Select All Fields");
			return;
		}
		let value = formData;
		value[edit].name = skill;
		value[edit].level = experience;
		setFormData(value);
		handleShow();
		setUpdate(true);
	};

	const handleChange = (type, e) => {
		if (type === "skill") {
			setSkill(e.value);
		}
		if (type === "experience") {
			setExperience(e.value);
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
				<h5>Skills</h5>
				<Link to='#'>
					<p onClick={() => handleShow()}>{!show && "Add New"}</p>
				</Link>
			</div>
			<div className='meta-content-body'>
				{show && (
					<div className='form-wrapper'>
						<SkillsSelect
							className='form-select'
							name='name'
							skill={skill}
							handleChange={handleChange}
							options={skills.map(skill => {
								return {
									value: skill,
									label: skill,
								};
							})}
						/>
						<CustomSelect
							className='form-select'
							name='level'
							title='Experience Level'
							options={[
								{
									value: "Beginner",
									label: "Beginner",
								},
								{
									value: "Intermediate",
									label: "Intermediate",
								},
								{value: "Expert", label: "Expert"},
							]}
							experience={experience}
							handleChange={handleChange}
						/>
						<Buttons
							setShow={setShow}
							setUpdate={setUpdate}
							handleUpdate={handleUpdate}
							handleAdd={handleAdd}
							edit={edit}
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

export default NewEditSkills;

const SkillsSelect = ({options, handleChange, skill}) => {
	return (
		<>
			<CreatableSelect
				className='creatableField'
				name='name'
				options={options}
				value={skill ? {value: skill, label: skill} : null}
				onChange={e => handleChange("skill", e)}
				placeholder='Add Skill (e.g. Voice Talent)'
			/>
		</>
	);
};

const CustomSelect = ({name, experience, options, handleChange}) => {
	return (
		<>
			<Select
				name={name}
				options={options}
				value={{value: experience, label: experience}}
				onChange={e => handleChange("experience", e)}
				placeholder='Experience'
			/>
		</>
	);
};

const DataTable = ({formData, handleEdit, handleDelete}) => {
	return (
		<>
			<div className='content-skills'>
				{formData?.map((item, index) => (
					<div className='skill' key={index}>
						<span>{item.name}</span>
						{/* &nbsp;&nbsp; -<span>{item.level}</span> */}
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
			</div>
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
