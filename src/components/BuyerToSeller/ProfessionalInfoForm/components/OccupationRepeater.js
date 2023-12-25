import React, { useState, useEffect } from "react";
import styles from "../styles.module.css";
import { useSelector } from "react-redux";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import { Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { ErrorMessage } from "formik";
import { makeStyles } from "@material-ui/core";

// eslint-disable-next-line
const useStyles = makeStyles({
  errorMessage: {
    fontSize: "12px",
    color: "red",
  },
});
// eslint-disable-next-line
const OccupationRepeater = ({ form, item, index, keyLoop }) => {
  const categoryRaw = useSelector((state) => state.category);
  // eslint-disable-next-line
  const categoryOption = categoryRaw?.data.map((category, index) => {
    if (category.child.length > 2)
      return {
        value: category.title,
        id: category.id,
      };
  });

  const dataList = new Date().getFullYear();
  const years = Array.from(new Array(52), (val, index) => dataList - index);
  const optionsYear = years?.map((year, index) => ({
    id: year,
    name: year,
    value: year,
  }));
  // eslint-disable-next-line
  const [yearFrom, setYearFrom] = useState(optionsYear[0].value);
  const [yearTo, setYearTo] = useState([]);
  const [subCategoryOption, setSubCategoryOption] = useState([]);

  useEffect(() => {
    setSubCategoryOption(findChild(categoryRaw?.data, item.category_id));
    let yearToOptions = optionsYear.filter(function (year) {
      return (
        parseInt(year.value) >= parseInt(form.values.occupation[index].from)
      );
    });
    setYearTo(yearToOptions);
    // eslint-disable-next-line
  }, [
    categoryRaw,
    // eslint-disable-next-line
    form.values.occupation[index].category_id,
    // eslint-disable-next-line
    form.values.occupation[index].from,
  ]);

  const findChild = (parentArray = [], id) => {
    let results = [];
    for (const parent of parentArray) {
      if (parent.id?.toString() === id?.toString()) {
        results = parent.child;
      }
    }
    return results;
  };

  const handleChange = (name, e) => {
    let occupationValue = form.values.occupation;
    if (name === "occupation") {
      occupationValue[index].category_id = e.target.value;
      occupationValue[index].child_category_id = [];
      occupationValue[index].from = yearFrom;
      occupationValue[index].to = "";
    } else if (name === "checkbox") {
      let childIds = occupationValue[index].child_category_id;
      if (childIds.includes(null)) {
        const indexOfChild = childIds.indexOf(null);
        childIds.splice(indexOfChild, 1);
      }
      if (childIds.includes(e.target.value)) {
        const indexOfChild = childIds.indexOf(e.target.value);
        childIds.splice(indexOfChild, 1);
      } else {
        childIds.push(e.target.value);
      }
      occupationValue[index].child_category_id = childIds;
    } else if (name === "from") {
      occupationValue[index].from = e.target.value;
    } else if (name === "to") {
      occupationValue[index].to = e.target.value;
    }
    form.setFieldValue("occupation", occupationValue);
  };
  const handleDelete = () => {
    let occupationValue = form.values.occupation;
    occupationValue.splice(index, 1);
    form.setFieldValue("occupation", occupationValue);
  };

  return (
    <React.Fragment key={keyLoop}>
      <Row
        style={{
          width: "100%",
        }}
      >
        <Col md={5}>
          <CustomSellerSelect
            name="occupation"
            options={categoryOption}
            value={item.category_id}
            occupation={form.values.occupation}
            handleChange={handleChange}
            index={index}
          />

          <ErrorMessage
            name={`occupation[${index}].category_id`}
            render={(msg) => <span className="error-message">{msg}</span>}
          />
        </Col>
        {index > 0 && !form.values.occupation[index].category_id ? (
          <Col md={2}>
            <span
              type="reset"
              onClick={handleDelete}
              className={styles.removeBtn}
            >
              <DeleteTwoToneIcon fontSize="small" />
            </span>
          </Col>
        ) : (
          ""
        )}
        {form.values.occupation[index].category_id && (
          <>
            <Col md={3} className="pl-2 pr-0">
              <Form.Group
                as={Row}
                controlId="formPlaintextEmail"
                className="align-items-baseline"
              >
                <Form.Label
                  column
                  sm="4"
                  className={`${styles.formInnerLevels} text-center`}
                >
                  From
                </Form.Label>
                <Col sm="8" className="pl-1">
                  <CustomYearSelect
                    name="from"
                    options={optionsYear}
                    className={styles.select}
                    placeholder="From"
                    value={form.values.occupation[index].from}
                    handleChange={handleChange}
                  />
                  <ErrorMessage
                    name={`occupation[${index}].from`}
                    render={(msg) => (
                      <span className={`${styles.errorMsg} error-message`}>
                        {msg}
                      </span>
                    )}
                  />
                  {/* <KeyboardArrowDownIcon fontSize="small" className={styles.arrowIcon} /> */}
                </Col>
              </Form.Group>
            </Col>
            <Col md={3} className="pl-0">
              <Form.Group
                as={Row}
                controlId="formPlaintextEmail"
                className="align-items-baseline"
              >
                <Form.Label
                  column
                  sm="4"
                  className={`${styles.formInnerLevels} text-center`}
                >
                  To
                </Form.Label>
                <Col sm="8" className="pl-0">
                  <CustomYearSelect
                    name="to"
                    options={yearTo}
                    className={styles.select}
                    placeholder="To"
                    value={form.values.occupation[index].to}
                    handleChange={handleChange}
                  />
                  <ErrorMessage
                    name={`occupation[${index}].to`}
                    render={(msg) => (
                      <span className={`${styles.errorMsg} error-message`}>
                        {msg}
                      </span>
                    )}
                  />

                  {/* <KeyboardArrowDownIcon fontSize="small" className={styles.arrowIcon} /> */}
                </Col>
              </Form.Group>
            </Col>
            <Col md={1} className="text-left">
              {index > 0 ? (
                <span
                  type="reset"
                  onClick={handleDelete}
                  className={styles.removeBtn}
                >
                  <DeleteTwoToneIcon fontSize="small" />
                </span>
              ) : (
                ""
              )}
            </Col>
            <Col md={8} className="pt-3">
              <p className={`${styles.mainTitle}`}>
                Choose <strong>two to five</strong> of your best skills in
                &nbsp;
                <strong
                  style={{
                    color: "#1dbf73",
                  }}
                >
                  {
                    categoryOption?.filter(
                      (opt) =>
                        opt?.id?.toString() ===
                        form.values.occupation[index].category_id?.toString()
                    )[0]?.value
                  }
                </strong>
              </p>

              <div className="m-1">
                <div>
                  {subCategoryOption.map((child, index) => {
                    return (
                      <CustomSellerCheckbox
                        loop={index}
                        name={`child[${child.id}]}`}
                        label={child.title}
                        title={child.title}
                        item={item}
                        key={child.id}
                        handleChange={handleChange}
                        id={child.id}
                      />
                    );
                  })}
                </div>
              </div>
            </Col>

            <Col md={12} className="mb-3">
              <ErrorMessage
                name={`occupation[${index}].child_category_id`}
                render={(msg) => <span className="error-message">{msg}</span>}
              />
            </Col>
          </>
        )}
      </Row>
    </React.Fragment>
  );
};

export default OccupationRepeater;

const CustomSellerSelect = ({
  name,
  options,
  handleChange,
  value,
  occupation,
  index,
}) => {
  return (
    <Form.Control
      as="select"
      name={name}
      value={value}
      className={styles.select}
      onChange={(e) => handleChange(name, e)}
    >
      <option value="" disabled={true}>
        Select Occupation
      </option>
      {options?.map((item, index) => {
        let valid = true;
        occupation?.map((initial, index) => {
          if (
            initial.category_id?.toString() === item?.id?.toString() &&
            initial.category_id !== value
          ) {
            valid = false;
          }
          return null;
        });
        return (
          <option value={item?.id} disabled={!valid} key={item?.id}>
            {" "}
            {item?.value}{" "}
          </option>
        );
      })}
    </Form.Control>
  );
};

const CustomYearSelect = ({
  name,
  options,
  placeholder,
  value,
  handleChange,
}) => {
  return (
    <Form.Control
      as="select"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => handleChange(name, e)}
      className={`${styles.selectsm} ${styles.select}`}
    >
      <option value="">Year</option>
      {options?.map((item, index) => (
        <option value={item.id} key={item.id}>
          {" "}
          {item.value}{" "}
        </option>
      ))}
    </Form.Control>
  );
};

const CustomSellerCheckbox = ({
  name,
  label,
  title,
  item,
  handleChange,
  id,
  loop,
}) => {
  let checked = false;
  for (const childId of item.child_category_id) {
    if (childId?.toString() === id?.toString()) checked = true;
  }
  return (
    <React.Fragment key={loop}>
      <div className="checkbox-wrap">
        <Form.Check type="checkbox">
          <Form.Check.Input
            type="checkbox"
            checked={checked}
            value={id}
            onChange={(e) => handleChange("checkbox", e)}
          />
          <Form.Check.Label className="pl-2 customCheckbox">
            {label}
          </Form.Check.Label>
          <Form.Control.Feedback type="valid">
            {"errorText"}
          </Form.Control.Feedback>
        </Form.Check>
      </div>
    </React.Fragment>
  );
};
