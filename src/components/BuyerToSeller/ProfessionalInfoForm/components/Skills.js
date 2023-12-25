import { ErrorMessage } from "formik";
import React, { useState } from "react";
import NewSkillTable from "../../../Table/LanguageTable/SkillTable";
import { Col, Row } from "react-bootstrap";
import styles from "../styles.module.css";
import CreatableSelect from "react-select/creatable";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../styling/Professional.css";

const skillLevels = [
  {
    id: "Beginner",
    value: "Beginner",
  },
  {
    id: "Intermediate",
    value: "Intermediate",
  },
  {
    id: "Expert",
    value: "Expert",
  },
];

function Skills({ skillSuggestion, form }) {
  const { skills } = useSelector((state) => state.professionalInfo);
  const [show, setShow] = useState(false);
  const [skill, setSkill] = useState();
  const [level, setLevel] = useState();
  // eslint-disable-next-line
  const [Error, setError] = useState();
  const [edit, setEdit] = useState();

  const handleShow = () => {
    setShow((prev) => !prev);
    setSkill();
    setLevel(skillLevels[0].value);
    setError();
    setEdit();
  };

  const handleChange = (type, e) => {
    if (type === "name") {
      setSkill(e.value);
    }
    if (type === "level") {
      setLevel(e.target.value);
    }
  };
  const handleAdd = () => {
    if (!level || !skill) {
      setError("Please Select Required Fields");
      return;
    }
    let value = form.values.skills;
    value.push({
      name: skill,
      level: level,
    });
    form.setFieldValue("skills", value);
    handleShow();
  };

  const handleEdit = (index) => {
    setShow(true);
    let data = form.values.skills;
    setSkill(data[index].name);
    setLevel(data[index].level);
    setEdit(index);
  };

  const handleUpdate = () => {
    if (!skill || !level) {
      setError("Please Select Required Fields");
      return;
    }
    let value = form.values.skills;
    value[edit].name = skill;
    value[edit].level = level;
    form.setFieldValue("skills", value);
    handleShow();
  };

  const handleDelete = (index) => {
    let value = form.values.skills;
    value = value.filter((item, key) => key !== index);
    form.setFieldValue("skills", value);
  };

  return (
    <>
      {show ? (
        <div className={styles.selectorWrapper}>
          <Row>
            <Col md={5}>
              {/* <CustomSellerInput /> */}
              <CustomSelect
                skillSuggestion={skillSuggestion}
                name="name"
                skills={skills}
                handleChange={handleChange}
                skill={skill}
              />
            </Col>
            <Col md={4} className="pl-0 pr-2">
              <CustomSellerSelect
                options={skillLevels}
                name="level"
                handleChange={handleChange}
                level={level}
              />
              {/* <KeyboardArrowDownIcon fontSize="small" className={styles.arrowIcon} /> */}
            </Col>
            <Col md={3} className="d-flex justify-content-around">
              <span className={styles.RepeaterBtnCancel} onClick={handleShow}>
                Cancel
              </span>
              {edit == null ? (
                <span
                  type="button"
                  className={
                    styles.RepeaterBtnCancel +
                    " " +
                    (skill && level ? styles.btnGreen : "")
                  }
                  onClick={handleAdd}
                >
                  Add
                </span>
              ) : (
                <span
                  type="button"
                  className={
                    styles.RepeaterBtnCancel +
                    " " +
                    (skill && level ? styles.btnGreen : "")
                  }
                  onClick={handleUpdate}
                >
                  Update
                </span>
              )}
            </Col>
          </Row>
        </div>
      ) : (
        ""
      )}
      <NewSkillTable
        handleDelete={handleDelete}
        handleShow={handleShow}
        handleEdit={handleEdit}
        form={form}
      />
      <ErrorMessage
        name="skills"
        render={(msg) => <span className="error-message">{msg}</span>}
      />
    </>
  );
}

export default Skills;

const CustomSelect = ({ name, handleChange, skills, skill }) => {
  return (
    <>
      <CreatableSelect
        className="creatableField"
        name="name"
        options={skills.map((skill) => ({ value: skill, label: skill }))}
        placeholder="Add Skill (e.g. Voice Talent)"
        onChange={(e) => handleChange("name", e)}
        value={skill ? { value: skill, label: skill } : null}
      />
    </>
  );
};

const CustomSellerSelect = ({ name, options, handleChange, level }) => {
  return (
    <Form.Control
      as="select"
      name={name}
      onChange={(e) => handleChange("level", e)}
      value={level}
      className={`${styles.selectmd} ${styles.select}`}
    >
      {options.map((item, index) => (
        <option value={item.id} key={item.id}>
          {" "}
          {item.value}{" "}
        </option>
      ))}
    </Form.Control>
  );
};
