import React from "react";
import Button from "@material-ui/core/Button";
import { useForm, Form as MyForm } from "./useForm";
import * as Control from "./Control";

const initialValues = {
  email: "",
  password: "",
  remember: "",
  gender: "",
  country: "",
  skills: "",
  date: "",
  file: "",
  textarea: "",
};
function Form() {
  const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 4));
  };
  const { formik } = useForm({ initialValues, onSubmit });
  return (
    <>
      <MyForm formik={formik}>
        <Control.CustomInput
          formik={formik}
          type="text"
          label="Email Address"
          name="email"
          fullWidth
        />
        <Control.CustomInput
          formik={formik}
          type="password"
          label="Password"
          name="password"
          fullWidth
        />
        <Control.CustomInput
          formik={formik}
          type="date"
          label="date"
          name="date"
          fullWidth
        />
        <Control.CustomUpload
          formik={formik}
          label="image"
          name="file"
          fullWidth
        />
        <Control.CustomTextarea
          formik={formik}
          label="textarea"
          name="textarea"
          rowsMin="8"
        />
        <Control.CustomTextEditor formik={formik} name="texteditor" height="250" />
        <Control.CustomSelect
          formik={formik}
          label="Country"
          name="country"

          options={[
            {
              value: "nepal",
              label: "Nepal",
            },
            {
              value: "usa",
              label: "USA",
            },
            {
              value: "germany",
              label: "Germany",
            },
          ]}
        />
        <Control.CustomMultipleSelect
          formik={formik}
          label="Country"
          name="skills"
          options={[
            {
              value: "react",
              label: "React",
            },
            {
              value: "frontend",
              label: "Frontend",
            },
            {
              value: "laravel",
              label: "Frontend",
            },
            {
              value: "vue",
              label: "Vue",
            },
          ]}
        />
        <Control.CustomRadio
          row
          formik={formik}
          name="gender"
          label="Your Gender"
          options={[
            {
              value: "female",
              label: "Female",
            },
            {
              value: "male",
              label: "Male",
            },
            {
              value: "other",
              label: "Other",
            },
          ]}
        />
        <Control.CustomCheckbox
          formik={formik}
          label="Remember Me"
          name="remember"
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign In
        </Button>
      </MyForm>
    </>
  );
}

export default Form;
