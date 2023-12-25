import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "../../../components/common/form/useForm";
import * as yup from "yup";
import { Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { submitRequirement } from "../redux/action";
import { serialize } from "object-to-formdata";
import { useHistory } from "react-router-dom";
import ButtonSpinner from "../../common/ButtonSpinner/ButtonSpinner";

function RequirementForm({
  orderRequirement,
  orderId,
  url,
  handleReload = null,
}) {
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

  const dispatch = useDispatch();
  const history = useHistory();
  const handleHistory = () => {
    history.replace(`${url}${orderId}`);
    handleReload && handleReload();
  };
  const onSubmit = (values) => {
    const options = {
      indices: true,
    };
    const formData = serialize(
      { ...values.requirement },
      options // optional
    );
    dispatch(submitRequirement(orderId, formData, handleHistory));
  };
  const { CustomTextarea, CustomUpload, CustomCheckbox, CustomForm } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <CustomForm>
        <div className="RequirementForm">
          {orderRequirement?.map((item, index) =>
            item.type === "Free text" ? (
              <div className="requirement-textarea" key={index}>
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
              <div className="requirement-attachment" key={index}>
                <div className="question">{item.question}</div>
                <Field
                  component={FileUpload}
                  CustomUpload={CustomUpload}
                  index={index}
                />
              </div>
            ) : item.type === "Multiple choice" ? (
              <div className="requirement-checkbox" key={index}>
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
    </>
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
    <div className="upload-containers solid">
      <div className="text-container">
        <i className="far fa-check-circle"></i>
        <div className="file-names">
          <span className="text-contain">{name}</span>
          <div className="edit">
            <i className="fa fa-trash" onClick={handleDelete}></i>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="upload-containers dashed ">
      <div className="req-title-header">Upload Your Files Here</div>
      <div className="file-type image"></div>
      <CustomUpload
        name={`requirement[${index}]['answer']`}
        label="Browse a File"
      />
      <div className="requiremnt-max-size">Max Size: 1 GB</div>
    </div>
  );
};

const Agreement = () => {
  const [disable, setDisable] = useState(false);
  const handleDisable = (e) => {
    setDisable((prev) => !prev);
  };
  const { postLoading } = useSelector((state) => state.checkout);
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
          {postLoading && <ButtonSpinner />} Start Order
        </Button>
      </div>
    </>
  );
};
