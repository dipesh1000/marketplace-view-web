import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import { Alert, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "../../common/form/useForm";
import "./style/GigRequirement.scss";

function GigRequirementForm({ initialValue, validationSchema, onSubmit }) {
  const [addShow, setAddShow] = useState(false);
  const [editId, setEditId] = useState();
  const [viewEdit, setViewEdit] = useState(false);
  const [count, setCount] = useState(0);
  const handleQuestionAdd = () => {
    setAddShow((prev) => !prev);
  };
  const changeCount = (data) => {
    setCount(data);
  };
  useEffect(() => {
    initialValue.requirements?.length &&
      setCount(initialValue.requirements?.length);
    // eslint-disable-next-line
  }, []);
  const handleViewEdit = (count) => {
    setEditId(count);
    handleQuestionAdd();
    setViewEdit((prev) => !prev);
  };
  const [newInitialValue, setNewInitialValue] = useState();
  let initialValues = newInitialValue ? newInitialValue : initialValue;

  const handleCount = (data) => {
    setNewInitialValue({ ...initialValue, requirements: data });
    setCount(count + 1);
    handleQuestionAdd();
  };
  const handleEdit = (data) => {
    setNewInitialValue({ ...initialValue, requirements: data });
    setViewEdit(false);
    handleQuestionAdd();
  };
  const removeList = (data) => {
    setNewInitialValue({ ...initialValue, requirements: data });
    setCount(count - 1);
  };
  const {
    CustomForm,
    CustomHiddenInput,
    CustomTextarea,
    CustomSelect,
    CustomCheckbox,
    CustomInput,
  } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="requirement">
      <CustomForm>
        <div className="requirement-wrapper">
          <div className="title">
            Get all the information you need from buyers to get started
          </div>
          <div className="subtitle">
            Add questions to help buyers provide you with exactly what you need
            to start working on their order.
          </div>
          <div className="title-break">Your Questions</div>

          {!addShow && (
            <Field
              component={ViewList}
              removeList={removeList}
              handleViewEdit={handleViewEdit}
              changeCount={changeCount}
            />
          )}
          {viewEdit && (
            <Field
              component={EditQuestion}
              handleViewEdit={handleViewEdit}
              count={editId}
              handleEdit={handleEdit}
              CustomTextarea={CustomTextarea}
              CustomSelect={CustomSelect}
              CustomHiddenInput={CustomHiddenInput}
              CustomCheckbox={CustomCheckbox}
            />
          )}
          {!viewEdit &&
            (addShow ? (
              <Field
                component={AddQuestion}
                handleQuestionAdd={handleQuestionAdd}
                count={count}
                CustomHiddenInput={CustomHiddenInput}
                CustomInput={CustomInput}
                handleCount={handleCount}
                CustomTextarea={CustomTextarea}
                CustomSelect={CustomSelect}
                CustomCheckbox={CustomCheckbox}
              />
            ) : (
              <>
                <div className="question-btn-wrapper">
                  <div className="question-btn" onClick={handleQuestionAdd}>
                    <i className="fa fa-plus"></i> Add New Question
                  </div>
                </div>
                <br />
                <ErrorMessage
                  name="requirements"
                  render={(msg) => <span className="error-message">{msg}</span>}
                />
              </>
            ))}
          {/* <div className="error-text">You must add at least 1 requirement</div> */}
        </div>
        <div className="d-flex justify-content-between mt-4">
          <Link to="/users/seller_dashboard/gigs" className="custom-btn cancel">
            Cancel
          </Link>
          <button type="submit" className="custom-btn successBtn">
            Save & Continue
          </button>
        </div>
      </CustomForm>
    </div>
  );
}

export default React.memo(GigRequirementForm);

const ViewList = ({ form, removeList, handleViewEdit, changeCount }) => {
  useEffect(() => {
    changeCount(form.values.requirements?.length);
    // eslint-disable-next-line
  }, [form.values.requirements.length]);
  const handleDelete = (count) => {
    const data = form.values.requirements.filter(
      (item, index) => index !== count
    );
    removeList(data);
  };
  const handleEdit = (count) => {
    handleViewEdit(count);
  };
  return form.values.requirements[0]?.question ? (
    <div className="view-list-wrapper">
      <ul>
        {form.values.requirements.map((item, index) => (
          <li key={index}>
            <div className="title-wrap">
              <div className="title">
                {item.type === "Free text" && (
                  <i className="fas fa-text-width"></i>
                )}
                {item.type === "Multiple choice" && (
                  <i className="fas fa-arrows-alt"></i>
                )}
                {item.type === "Attachment" && (
                  <i className="fas fa-paperclip"></i>
                )}
                {item.type}
              </div>
              <div className="action-filter">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    <i className="fas fa-ellipsis-h"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => handleEdit(index)}
                      // to={`/sellerdashboard/manage_gigs/${item.slug}/edit_gigs`}
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(index)}>
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="question">{item.question}</div>

            <div className="option-list">
              {item?.choice_options?.data?.map((choice, index) => (
                <span>{choice.option != null && choice.option}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

const AddQuestion = ({
  form,
  count,
  handleCount,
  handleQuestionAdd,
  CustomSelect,
  CustomCheckbox,
  CustomTextarea,
  CustomHiddenInput,
}) => {
  const options = [
    { value: "Free Text", id: "Free text" },
    { value: "Multiple Choice", id: "Multiple choice" },
    { value: "Attachment", id: "Attachment" },
  ];
  const [error, setError] = useState();
  const [showData, setShowData] = useState(false);
  const [choice, setChoice] = useState([]);

  const handleAdd = () => {
    // form.registerField('requirements[0].choice_options.data');
    let requirement = form.values.requirements[count];
    form.values.requirements[count]?.choice_options?.data.push(...choice);
    // form.setFieldValue(
    //   `requirements[${count}]['choice_options']['data']`,
    //   choice
    // );
    requirement?.type && requirement?.question
      ? handleCount(form.values.requirements)
      : setError("Fill the Required Fields");
  };
  const handleSelect = (e) => {
    if (e.target.value === "Multiple choice") {
      setChoice([{ option: "" }, { option: "" }]);
      setShowData((prev) => !prev);
    } else {
      setShowData(false);
      setChoice([]);
    }
  };
  return (
    <div className="add-question-wrapper">
      <div className="title-wrap">
        <div className="add-title">
          Add a question<span style={{ color: "red" }}>*</span>
        </div>
        <div className="required">
          <CustomCheckbox
            name={`requirements[${count}]['is_required']`}
            label="Required"
          />
        </div>
      </div>
      <div className="textarea-wrap">
        <CustomTextarea
          name={`requirements[${count}]['question']`}
          counter={true}
          max={400}
          placeholder="Request necessary details such as dimensions, brand guidelines, and more."
        />
      </div>
      <div className="add-title">
        Get it in a form of: <span style={{ color: "red" }}>*</span>
      </div>
      <div className="multiple-top-wrap">
        <div className="select-wrap">
          <CustomSelect
            name={`requirements[${count}]['type']`}
            options={options}
            title="Select"
            onClick={handleSelect}
          />
        </div>
        {/* {showData && (
          <CustomCheckbox
            name={`requirements[${count}]['choice_options']['enable_choose_more_option']`}
            label="Enable to choose more than 1 option"
          />
        )} */}
        {showData && (
          <CustomHiddenInput
            name={`requirements[${count}]['choice_options']['data']`}
            value={[]}
          />
        )}
      </div>
      {showData && <MultipleChoice choice={choice} setChoice={setChoice} />}
      {error && <Alert variant="warning">{error}</Alert>}
      <div className="button-wrap">
        <span className="custom-btn cancel" onClick={handleQuestionAdd}>
          Cancel
        </span>
        <span className="custom-btn successBtn" onClick={handleAdd}>
          Add
        </span>
      </div>
    </div>
  );
};

const MultipleChoice = ({ choice, setChoice }) => {
  const addChoiceCount = () => {
    let newArr = [...choice];
    newArr.push({ option: "" });
    setChoice(newArr);
  };
  const removeChoiceCount = (data) => {
    let newArr = choice.filter((list, index) => index !== data);
    setChoice(newArr);
  };
  const handleChange = (e, index) => {
    let newArr = [...choice];
    newArr[index] = { option: e.target.value };
    setChoice(newArr);
  };
  return (
    <div className="multiple-wrapper">
      {choice?.map((list, index) => (
        <div className="input-wrapper" key={index}>
          <input
            type="text"
            onChange={(e) => handleChange(e, index)}
            value={list.option}
            placeholder="Add Option"
          />
          <span onClick={() => removeChoiceCount(index)}>
            <i className="fa fa-times"></i>
          </span>
        </div>
      ))}

      <div className="question-btn-wrapper">
        <div className="question-btn" onClick={addChoiceCount}>
          <i className="fa fa-plus"></i> Add New Option
        </div>
      </div>
    </div>
  );
};

const EditQuestion = ({
  form,
  count,
  handleEdit,
  handleViewEdit,
  CustomSelect,
  CustomCheckbox,
  CustomTextarea,
  CustomHiddenInput,
}) => {
  const options = [
    { value: "Free Text", id: "Free text" },
    { value: "Multiple Choice", id: "Multiple choice" },
    { value: "Attachment", id: "Attachment" },
  ];
  const [error, setError] = useState();
  const [showData, setShowData] = useState(false);
  const [choice, setChoice] = useState([{ option: "" }, { option: "" }]);
  useEffect(() => {
    form.values.requirements[count].type === "Multiple choice" &&
      setShowData(true);
    form.values.requirements[count]?.choice_options?.data &&
      setChoice(form.values.requirements[count]?.choice_options?.data);
    // eslint-disable-next-line
  }, []);
  const handleSelect = (e) => {
    if (e.target.value === "Multiple choice") {
      setShowData((prev) => !prev);
    } else {
      setShowData(false);
    }
  };
  const handleAdd = () => {
    let requirement = form.values.requirements[count];
    let Array1 = form.values.requirements[count].choice_options?.data;
    Array1?.splice(0, Array1?.length, ...choice);
    requirement?.type && requirement?.question
      ? handleEdit(form.values.requirements)
      : setError("Fill the Required Fields");
  };
  return (
    <div className="add-question-wrapper">
      <div className="title-wrap">
        <div className="add-title">Add a question*</div>
        <div className="required">
          <CustomCheckbox
            name={`requirements[${count}]['is_required']`}
            label="Required"
          />
        </div>
      </div>
      <div className="textarea-wrap">
        <CustomTextarea
          name={`requirements[${count}]['question']`}
          counter={true}
          max={400}
          placeholder="Request necessary details such as dimensions, brand guidelines, and more."
        />
      </div>
      <div className="add-title">Get it in a form of: *</div>
      <div className="multiple-top-wrap">
        <div className="select-wrap">
          <CustomSelect
            name={`requirements[${count}]['type']`}
            options={options}
            title="Select"
            onClick={handleSelect}
          />
        </div>
        {showData && (
          <CustomCheckbox
            name={`requirements[${count}]['choice_options']['enable_choose_more_option']`}
            label="Enable to choose more than 1 option"
          />
        )}
        {showData && (
          <CustomHiddenInput
            name={`requirements[${count}]['choice_options']['data']`}
            value={[]}
          />
        )}
      </div>
      {showData && <MultipleChoice choice={choice} setChoice={setChoice} />}
      {error && <Alert variant="warning">{error}</Alert>}
      <div className="button-wrap">
        <span
          className="custom-btn cancel"
          onClick={() => handleViewEdit(null)}
        >
          Cancel
        </span>
        <span className="custom-btn successBtn" onClick={handleAdd}>
          Edit
        </span>
      </div>
    </div>
  );
};
