import React from "react";
import * as yup from "yup";
import { Field } from "formik";
import { useDispatch } from "react-redux";
import { serialize } from "object-to-formdata";
import { useForm } from "../common/form/useForm";
import { contactSeller } from "../chat/redux/Action";

function SendMessage({ user_id }) {
  const initialValues = {
    file: null,
    message: "",
    user_id: user_id,
  };
  const validationSchema = yup.object({
    file: yup.object().nullable(),
    message: yup.string(),
  });

  const dispatch = useDispatch();
  const onSubmit = (values) => {
    const options = {
      indices: true,
    };
    const formData = serialize(
      values,
      options // optional
    );
    dispatch(contactSeller(formData));
  };
  const { CustomTextarea, CustomUpload, CustomForm } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="delivery-wrapper">
      <CustomForm>
        <CustomTextarea
          name="message"
          maxLength="2500"
          counter
          max="2500"
          maxText="max"
          placeholder="Describe your requirements ..."
          rows={6}
          className="custom-text"
        />
        <Field component={FileUpload} CustomUpload={CustomUpload} />

        <div className="btn-wrap">
          <button type="submit" className="send-btn">
            <i className="fas fa-paper-plane"></i> Send Message
          </button>
        </div>
      </CustomForm>
    </div>
  );
}

export default SendMessage;

const FileUpload = ({ form, CustomUpload }) => {
  let file = form.values?.file;
  const handleDelete = () => {
    form.setFieldValue(`file`, null);
  };

  function bytesToSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    var k = 1024,
      dm = 2,
      sizes = ["Bytes", "KB", "MB"],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <>
      <div className="upload-container-file dashed ">
        <div className="file-type image"></div>
        {/* <CustomUpload name='file' label='Upload Attachments' /> */}
        <CustomUpload
          name="file"
          className="file-input"
          label="Upload Attachments"
        />
        <div className="max-size">Max Size: 5 MB</div>
      </div>
      {/* <div className='upload-container solid'>
				<div className='name'>
					<i className='far fa-check-circle'></i>
					<div className='file-info'>
						<strong>{form.values?.attachments?.name}</strong>
						<small>{bytesToSize(form.values?.file?.size)}</small>
					</div>
				</div>
				<div className='delete'>
					<i className='fa fa-trash' onClick={handleDelete}></i>
				</div>
			</div> */}
      {file && (
        <div className="upload-container solid">
          <div className="name">
            <i className="far fa-check-circle"></i>
            <div className="file-info">
              <strong>{file?.name}</strong>
              <small>{bytesToSize(file?.size)}</small>
            </div>
          </div>
          <div className="delete">
            <i className="fa fa-trash-alt" onClick={() => handleDelete()}></i>
          </div>
        </div>
      )}
    </>
  );
};
