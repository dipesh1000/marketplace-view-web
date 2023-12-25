import React from "react";
import { useForm } from "../../../components/common/form/useForm";
import * as yup from "yup";
import { Field } from "formik";
import { useDispatch } from "react-redux";
import { sendDelivery } from "../redux/Action";
import { serialize } from "object-to-formdata";

function DeliveryBox({ orderId }) {
  // const { orderId } = useParams();
  const initialValues = {
    attachments: [],
    message: "",
  };
  const validationSchema = yup.object({
    attachments: yup.object().nullable(),
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
    dispatch(sendDelivery(orderId, formData));
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
          placeholder="Describe your delivery in detail ..."
          rows={5}
          className="custom-text"
        />
        <Field component={FileUpload} CustomUpload={CustomUpload} />
        <div className="btn-wrap">
          <button type="submit" className="send-btn">
            <i class="fas fa-paper-plane"></i> Deliver Work
          </button>
        </div>
      </CustomForm>
    </div>
  );
}

export default DeliveryBox;

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
      <div className="upload-container-file dashed">
        <div className="title-header">Drag And Drop Your Files Here</div>
        <div className="file-type image"></div>
        <CustomUpload name={`attachments[${fileCount}]`} label="Upload Work" />
        <div className="max-size">Max Size: 1 GB</div>
      </div>
      {form.values?.attachments?.map((item, index) => (
        <div className="upload-container solid file_List_Item" key={index}>
          <div className="name">
            <i className="far fa-check-circle"></i>
            {item.name}
          </div>
          <div className="delete">
            <i className="fa fa-trash" onClick={() => handleDelete(index)}></i>
          </div>
        </div>
      ))}
    </>
  );
};
