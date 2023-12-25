import React from "react";
import { useForm } from "../../../components/common/form/useForm";
import * as yup from "yup";
import { Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { sendOrderMessage } from "../redux/Action";
import { useParams } from "react-router-dom";
import { serialize } from "object-to-formdata";
import { MdAttachFile } from "react-icons/md";
import ButtonSpinner from "../../common/ButtonSpinner/ButtonSpinner";

function ChatBox({ handleReload }) {
  const { orderId } = useParams();
  const { postLoading } = useSelector((state) => state.sellerOrders);

  const initialValues = {
    attachments: [],
  };
  const validationSchema = yup.object({
    attachments: yup.object().nullable(),
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
    dispatch(sendOrderMessage(orderId, formData, handleReload));
  };
  const { CustomTextarea, CustomUpload, CustomForm } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <CustomForm>
        <CustomTextarea
          name="message"
          maxLength="2500"
          counter
          max="2500"
          maxText="max"
          rows={4}
          className="custom-text"
        />
        <div className="fileUploadContainer">
          <Field component={FileUpload} CustomUpload={CustomUpload} />
        </div>
        <div className="send-btn-div">
          <button type="submit" className="send-btn">
            {postLoading ? (
              <ButtonSpinner />
            ) : (
              <i className="fas fa-paper-plane mr-2"></i>
            )}
            Send
          </button>
        </div>
      </CustomForm>
    </>
  );
}

export default ChatBox;

const FileUpload = ({ form, CustomUpload }) => {
  let fileCount = form.values?.attachments?.length;

  const handleDelete = (count) => {
    form.setFieldValue(
      `attachments`,
      form.values?.attachments?.filter((item, index) => index !== count)
    );
  };

  return (
    <>
      <div className="upload-container dashed upload_btns">
        <div className="file-type image"></div>
        <CustomUpload
          name={`attachments[${fileCount}]`}
          label="Browse a File"
        />
        <MdAttachFile />
      </div>
      {form.values?.attachments?.map((item, index) => (
        <div className="upload-container solid imageItem mt-1 mb-1" key={index}>
          <div className="name">
            <i className="far fa-check-circle"></i>
            Filename "{item.name}" uploaded
          </div>
          <div className="delete">
            <i className="fa fa-trash" onClick={() => handleDelete(index)}></i>
          </div>
        </div>
      ))}
    </>
  );
};
