import React, { useEffect, useState } from "react";
import { Alert, Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Field } from "formik";
import "./style/GigFaq.scss";
import { useForm } from "../../common/form/useForm";

function GIGFaqForm({ initialValue, validationSchema, onSubmit, form }) {
  const [newInitialValue, setNewInitialValue] = useState();
  const [count, setCount] = useState(0);
  // let initialValues = newInitialValue ? newInitialValue: initialValue

  useEffect(() => {
    if (initialValue) {
      setCount(initialValue.faqs?.length);
      setNewInitialValue(initialValue);
    }
  }, [initialValue]);

  const { CustomForm, CustomInput, CustomTextarea } = useForm({
    initialValues: newInitialValue ?? initialValue,
    validationSchema,
    onSubmit,
  });
  return (
    <div className="faq">
      <CustomForm>
        <div className="description-wrapper">
          <div className="main-title">Description</div>
          <div className="line-break"></div>
          <div className="subtitle">Briefly Describe Your Gig</div>

          {/* <Field
						component={AddDescription}
						CustomTextEditor={CustomTextEditor}
					/> */}

          <Field
            component={AddDescription}
            CustomTextarea={CustomTextarea}
            setNewInitialValue={setNewInitialValue}
            setCount={setCount}
            count={count}
            newInitialValue={newInitialValue}
          />
        </div>

        <Field
          component={FaqComponent}
          CustomTextarea={CustomTextarea}
          CustomInput={CustomInput}
          setNewInitialValue={setNewInitialValue}
          setCount={setCount}
          count={count}
          newInitialValue={newInitialValue}
        />

        <div className="line-break more"></div>
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

export default React.memo(GIGFaqForm);

const FaqComponent = ({
  CustomInput,
  setNewInitialValue,
  CustomTextarea,
  setCount,
  count,
  newInitialValue,
}) => {
  const [addShow, setAddShow] = useState(false);

  const handleQuestionAdd = () => {
    setAddShow((prev) => !prev);
  };

  const removeList = (data) => {
    setNewInitialValue({ ...newInitialValue, faqs: data });
    setCount((prev) => prev - 1);
  };

  const handleCount = (data) => {
    setNewInitialValue({ ...data });
    setCount((prev) => prev + 1);
    handleQuestionAdd();
  };
  return (
    <div className="faq-wrapper">
      <div className="title-wrap">
        <div className="main-title">Frequently Asked Questions</div>
        {!addShow && (
          <div className="add-new" onClick={handleQuestionAdd}>
            {" "}
            + Add FAQ
          </div>
        )}
      </div>
      <div className="line-break"></div>
      <div className="subtitle">Add Questions & Answers for Your Buyers.</div>
      {addShow && (
        <Field
          component={AddQuestion}
          handleCount={handleCount}
          CustomTextarea={CustomTextarea}
          count={count}
          CustomInput={CustomInput}
          setNewInitialValue={setNewInitialValue}
          newInitialValue={newInitialValue}
        />
      )}
      {
        <Field
          component={ViewList}
          CustomTextarea={CustomTextarea}
          removeList={removeList}
          count={count}
          CustomInput={CustomInput}
          setNewInitialValue={setNewInitialValue}
          newInitialValue={newInitialValue}
          setCount={setCount}
        />
      }
    </div>
  );
};

const AddQuestion = ({
  form,
  count,
  handleCount,
  CustomInput,
  CustomTextarea,
  setNewInitialValue,
  newInitialValue,
}) => {
  const [error, setError] = useState();
  const handleAdd = () => {
    let faq = form.values?.faqs[count];

    faq?.title && faq?.description
      ? handleCount(form.values)
      : setError("Fill the Required Fields");
  };
  const handleCancel = () => {
    const data = form.values?.faqs.filter((item, index) => index !== count);
    setNewInitialValue({ ...newInitialValue, faqs: data });
  };
  return (
    <div>
      <CustomInput
        name={`faqs[${count}]['title']`}
        placeholder="Add a Question: i.e. Do you translate to English as Well?"
        type="text"
      />
      <div className="textarea-wrap">
        <CustomTextarea
          max="300"
          maxText=""
          counter
          maxLength="300"
          name={`faqs[${count}]['description']`}
          placeholder="Add a Answer: i.e. Yes, I also translate from English to Hebrew."
        />
      </div>

      {error && <Alert variant="warning">{error}</Alert>}
      <div className="btn-wrapper">
        <span className="cancel-btn" onClick={handleCancel}>
          CANCEL
        </span>
        <span className="add-btn" onClick={handleAdd}>
          Add
        </span>
      </div>
    </div>
  );
};

const ViewList = ({
  form,
  removeList,
  count,
  CustomInput,
  setNewInitialValue,
  newInitialValue,
  CustomTextarea,
  setCount,
}) => {
  useEffect(() => {}, [form.values?.faqs?.length]);

  const handleUptade = () => {
    let updatedValues = newInitialValue;
    updatedValues.faqs = form.values.faqs;
    setNewInitialValue({ ...updatedValues });
  };

  const handleDelete = (value) => {
    let data = form.values?.faqs;
    data = data.filter((item, index) => index !== value);
    // removeList(data);
    setNewInitialValue({ ...newInitialValue, faqs: data });
    setCount((prev) => prev - 1);
  };

  const handleEditCancel = () => {
    setNewInitialValue({ ...newInitialValue });
  };

  return count >= 0 ? (
    <div>
      <Accordion>
        {form.values?.faqs?.map((item, index) => (
          <Card>
            {/* <Card.Header> */}
            <Accordion.Toggle as={Card.Header} eventKey={index + 1}>
              <span className="questionTitle">
                <i className="fa fa-bars"></i>
                {item.title}
              </span>{" "}
              <span>
                <i className="fa fa-angle-down"></i>
              </span>
            </Accordion.Toggle>
            {/* </Card.Header> */}
            <Accordion.Collapse eventKey={index + 1}>
              <Card.Body>
                <CustomInput
                  name={`faqs[${index}]['title']`}
                  placeholder="Add a Question: i.e. Do you translate to English as Well?"
                  type="text"
                />
                <div className="textarea-wrap">
                  <CustomTextarea
                    max="300"
                    maxText=""
                    counter
                    maxLength="300"
                    name={`faqs[${index}]['description']`}
                    placeholder="Add a Answer: i.e. Yes, I also translate from English to Hebrew."
                  />
                </div>

                <div className="button-wrap">
                  <span
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    <i className="fa fa-times-circle"></i>Delete
                  </span>
                  <div className="btn-wrapper">
                    <span className="cancel-btn" onClick={handleEditCancel}>
                      CANCEL
                    </span>
                    <span className="add-btn" onClick={handleUptade}>
                      Update
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </div>
  ) : null;
};

const AddDescription = ({ CustomTextarea, form }) => {
  return (
    <CustomTextarea
      name="description"
      counter
      max="1200"
      maxText="Characters"
      maxLength="1200"
    />
  );
};

// const AddDescription = ({CustomTextEditor, form}) => {
// 	return (
// 		<CustomTextEditor
// 			name='description'
// 			counter
// 			max='1200'
// 			maxText='Characters'
// 			maxLength='1200'
// 		/>
// 	);
// };
