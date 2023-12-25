import { Field } from "formik";
import React from "react";
import { Spinner } from "react-bootstrap";
import Select from "react-select";

function CustomSelect({ name, langHandleChange, lang, lang_value }) {
  const options =
    lang.length < 0 ? (
      <>
        <Spinner animation="border" />
      </>
    ) : (
      lang?.data?.languages?.map((language) => ({
        value: language.title,
        label: language.title,
      }))
    );
  return (
    <>
      <Select
        name={name}
        options={options}
        inputValue={
          options?.find((p) => p.value === lang_value) ? lang_value : ""
        }
        onChange={langHandleChange}
      />
    </>
  );
}

export default CustomSelect;
