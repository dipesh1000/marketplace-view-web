import React from "react";
import { useForm } from "../common/form/useForm";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { reportGigIssue } from "./redux/Action";

function ReportForm({ handleClose, id }) {
  const dispatch = useDispatch();
  const initialValues = {
    id: id,
    reason: "",
  };
  const validationSchema = yup.object({
    reason: yup.string().required("Issue Report is Required"),
  });
  const onSubmit = (values) => {
    dispatch(reportGigIssue(values, handleClose));
  };
  const { CustomForm, CustomTextarea } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <>
      <CustomForm>
        <div className="report-form">
          <CustomTextarea name="reason" placeholder="Enter your Issue" />
          <div className="submit-button-wrap">
            <span class="close-btn" onClick={handleClose}>
              Close
            </span>
            <button type="submit">Submit</button>
          </div>
        </div>
      </CustomForm>
    </>
  );
}

export default ReportForm;
