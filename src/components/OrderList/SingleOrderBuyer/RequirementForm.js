import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import * as yup from "yup";
import { Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { serialize } from "object-to-formdata";
import { useForm } from "../../common/form/useForm";
import { getOrderRequirement } from "../../Order/redux/action";
import { submitRequirementBuyer } from "../redux/Action";
import ContainerSpinner from "../../common/ContainerSpinner/ContainerSpinner";

function RequirementForm({ orderId, slug }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderRequirement(slug));
    // eslint-disable-next-line
  }, [dispatch]);
  const { orderRequirement } = useSelector((state) => state.checkout);
  let newOrder = orderRequirement?.map((item) => ({
    id: item.id,
    type: item.type,
    required: item.is_required,
  }));
  const initialValues = {
    requirement: newOrder,
  };
  const validationSchema = yup.object({
    requirement: yup.array().of(
      yup.object({
        required: yup.boolean(),
        // answer: yup.mixed()
        answer: yup.mixed().when("required", {
          is: (val) => val === 1, // alternatively: (val) => val == true
          then: yup.mixed().required("Please Select Required Fields"),
          otherwise: yup.mixed().nullable(),
        }),
      })
    ),
  });

  const onSubmit = (values) => {
    const options = {
      indices: true,
    };
    const formData = serialize(
      { ...values.requirement },
      options // optional
    );
    dispatch(submitRequirementBuyer(orderId, formData));
  };
  const { CustomTextarea, CustomUpload, CustomCheckbox, CustomForm } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return !orderRequirement ? (
    <ContainerSpinner />
  ) : (
    <div className="MainContent">
      <CustomForm>
        <div className="RequirementForm">
          {orderRequirement?.map((item, index) =>
            item.type === "Free text" ? (
              <div className="requirement-textarea" key={item?.id}>
                <div className="question">{item.question}</div>
                <CustomTextarea
                  name={`requirement[${index}]['answer']`}
                  maxLength="2500"
                  counter
                  max="2500"
                  maxText="max"
                  rows={5}
                />
              </div>
            ) : item.type === "Attachment" ? (
              <div className="requirement-attachment" key={item?.id}>
                <div className="question">{item.question}</div>
                <Field
                  component={FileUpload}
                  CustomUpload={CustomUpload}
                  index={index}
                />
              </div>
            ) : item.type === "Multiple choice" ? (
              <div className="requirement-checkbox" key={item?.id}>
                <div className="question">{item.question}</div>
                {item?.choice_options?.data?.map((list) => (
                  <CustomCheckbox
                    value={list.option}
                    name={`requirement[${index}]['answer']`}
                    label={list.option}
                    key={list.option}
                    content={list.option}
                  />
                ))}
              </div>
            ) : null
          )}
          <Agreement />
          {/* <ErrorMessage name="requirement"></ErrorMessage> */}
        </div>
      </CustomForm>
    </div>
  );
}

export default RequirementForm;

const FileUpload = ({ form, CustomUpload, index }) => {
  let file = form.values.requirement[index]["answer"];
  const [name, setName] = useState("");
  const fileRead = (myFile) => {
    setName(myFile.name);
  };

  useEffect(() => {
    file && fileRead(file);
  }, [file]);

  const handleDelete = () => {
    form.setFieldValue(`requirement[${index}]['answer']`, "");
    setName("");
  };

  return name ? (
    <div className="upload-container solid">
      <div className="text-container">
        <i className="far fa-check-circle"></i>
        Filename "{name}" uploaded
      </div>
      <div className="edit">
        <i className="fa fa-trash" onClick={handleDelete}></i>
      </div>
    </div>
  ) : (
    <div className="upload-container dashed ">
      <div className="file-type image"></div>
      <CustomUpload
        name={`requirement[${index}]['answer']`}
        label="Browse a File"
      />
    </div>
  );
};

const Agreement = () => {
  const [disable, setDisable] = useState(false);
  const handleDisable = (e) => {
    setDisable((prev) => !prev);
  };
  return (
    <>
      <hr />

      <Form.Group className="mb-3 CheckboxInput" controlId="formBasicCheckbox">
        <input
          type="checkbox"
          onClick={handleDisable}
          readOnly
          checked={disable ? true : false}
        />
        <label>
          The information I provided is <b>accurate and complete.</b>Any{" "}
          <b>changes</b> will require the seller's approval, and may be subject
          to additional costs.
        </label>
      </Form.Group>
      <div className="requirementSubmitbtn">
        <Button type="submit" disabled={disable ? false : true}>
          Start Order
        </Button>
      </div>
    </>
  );
};
