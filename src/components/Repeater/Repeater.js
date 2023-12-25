import React, { useEffect, useState } from "react";
import { ErrorMessage, Field } from "formik";
import { Col, Row } from "react-bootstrap";
import styles from "./Repeater.module.css";
import NewLanguageTable from "../Table/LanguageTable/NewLanguageTable";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { makeStyles } from "@material-ui/core";
// import {ErroMessage} from 'formik'

const useStyles = makeStyles({
  btnGreen: {
    background: "#1dbf73",
    color: "white",
  },
  errorMessage: {
    fontSize: "12px",
    color: "red",
  },
});

function Repeater({ lang, form }) {
  const [show, setShow] = useState(false);
  const [language, setLanguage] = useState();
  const [proficiency, setProficiency] = useState();
  const [error, setError] = useState();
  const [edit, setEdit] = useState();
  const [options, setOptions] = useState([]);

  const classes = useStyles();

  const handleShow = () => {
    setShow((prev) => !prev);
    setLanguage();
    setProficiency(lang.proficiency[Object.keys(lang.proficiency)[0]]);
    setError();
    setEdit();
  };
  const handleEdit = (index) => {
    setShow(true);
    let data = form.values.language;
    setLanguage(data[index].value);
    setProficiency(data[index].proficiency);
    setEdit(index);
  };

  useEffect(() => {
    let optionData = lang.language || [];
    optionData = optionData.reduce(function (result, option) {
      let valid = true;
      form.values.language?.map((initial, index) => {
        if (index !== edit && initial.value === option.title) {
          valid = false;
        }
        return null;
      });
      if (valid) {
        return result.concat({
          value: option.title,
          label: option.title,
        });
      }
      return result;
    }, []);

    setOptions(optionData);
  }, [form.values.language, show, lang, edit]);

  const handleChange = (type, e) => {
    if (type === "proficiency") {
      setProficiency(e.target.value);
    }
    if (type === "language") {
      setLanguage(e.value);
    }
  };
  const handleAdd = () => {
    if (!language || !proficiency) {
      setError("Please Select Required Fields");
      return;
    }
    let value = form.values.language;
    value.push({ value: language, proficiency: proficiency });
    form.setFieldValue("language", value);
    handleShow();
  };

  const handleUpdate = () => {
    if (!language || !proficiency) {
      setError("Please Select Required Fields");
      return;
    }
    let value = form.values.language;
    value[edit].value = language;
    value[edit].proficiency = proficiency;
    form.setFieldValue("language", value);
    handleShow();
  };

  const handleDelete = (index) => {
    let value = form.values.language;
    value = value.filter((item, key) => key !== index);
    form.setFieldValue("language", value);
  };
  return (
    <>
      {show ? (
        <div className={styles.selectorWrapper}>
          <Row>
            <Col md={5}>
              <Field
                component={CustomSelect}
                name="languages"
                handleChange={handleChange}
                lang={lang}
                language={language}
                options={options}
              />
            </Col>
            <Col md={4} className="pl-0 pr-2">
              <Field
                component={NormalSelect}
                name="proficency"
                lang={lang}
                handleChange={handleChange}
                proficiency={proficiency}
              />
            </Col>
            <Col md={3} className="d-flex justify-content-around">
              <span className={styles.RepeaterBtnCancel} onClick={handleShow}>
                Cancel
              </span>
              {edit != null ? (
                <span
                  className={
                    styles.RepeaterBtnAdd +
                    " " +
                    (language && proficiency ? classes.btnGreen : "")
                  }
                  onClick={handleUpdate}
                >
                  Edit
                </span>
              ) : (
                <span
                  className={
                    styles.RepeaterBtnAdd +
                    " " +
                    (language && proficiency ? classes.btnGreen : "")
                  }
                  onClick={handleAdd}
                >
                  Add
                </span>
              )}
            </Col>
          </Row>
        </div>
      ) : (
        ""
      )}
      <div>
        <div className={styles.errorMsgDiv}>
          {error && (
            <span className={`${styles.errorMsg} error-message`}>{error}</span>
          )}
        </div>
        <NewLanguageTable
          handleShow={handleShow}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          form={form}
        />
        <ErrorMessage
          name="language"
          render={(msg) => <span className="error-message">{msg}</span>}
        />
      </div>
    </>
  );
}
export default Repeater;

const NormalSelect = ({ name, lang, proficiency, handleChange }) => {
  return (
    <Form.Control
      as="select"
      name={name}
      custom
      onChange={(e) => handleChange("proficiency", e)}
      value={proficiency}
    >
      {/* <option value=""> </option> */}
      {lang.proficiency &&
        Object.keys(lang.proficiency).map((key) => (
          <option value={lang.proficiency[key]} key={key}>
            {lang.proficiency[key]}
          </option>
        ))}
    </Form.Control>
  );
};

const CustomSelect = ({ name, language, options, handleChange }) => {
  return (
    <>
      <Select
        name={name}
        options={options}
        value={language ? { value: language, label: language } : null}
        onChange={(e) => handleChange("language", e)}
        placeholder="Select a language"
      />
    </>
  );
};
