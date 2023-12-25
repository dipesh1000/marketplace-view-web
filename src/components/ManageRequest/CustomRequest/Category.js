import { ErrorMessage } from "formik";
import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

function Category({ category, form, field }) {
  const options =
    category &&
    category
      .filter((item) => item.parent_id == null)
      .map((item) => {
        return { id: item.id, value: item.title };
      });

  const findCategory = (id) => {
    const resultcategory =
      category &&
      category
        .filter((item) => item.parent_id?.toString() === id?.toString())
        .map((item) => {
          return { id: item.id, value: item.title };
        });
    return resultcategory;
  };

  const [secondaryCategory, setSecondaryCategory] = useState(
    findCategory(field.value?.category)
  );

  const handleCategoryChange = (e) => {
    form.setValues({
      ...form.values,
      [e.target.name]: e.target.value,
      category_id: "",
    });
    setSecondaryCategory(findCategory(e.target.value));
  };
  const handleSubCategoryChange = (e) => {
    form.setValues({
      ...form.values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="title">Choose a category:</div>
      <div className="category-wrapper">
        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Control
                as="select"
                className="select"
                name="category"
                value={form.values.category}
                onChange={handleCategoryChange}
              >
                <option value="" disabled selected>
                  Select Category
                </option>
                {options &&
                  options.map((option, index) => (
                    <option key={option.id} value={option.id}>
                      {option.value}
                    </option>
                  ))}
              </Form.Control>
              <ErrorMessage
                name="category"
                render={(msg) => <span className="error-message">{msg}</span>}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Control
                as="select"
                className="select"
                name="category_id"
                //   onBlur={form.handleBlur}
                value={form.values.category_id}
                onChange={handleSubCategoryChange}
                disabled={form?.values?.category ? false : true}
              >
                <option value="" selected disabled>
                  Select subcategory
                </option>
                {secondaryCategory?.map((option, index) => (
                  <option key={option.id} value={option.id}>
                    {option.value}
                  </option>
                ))}
              </Form.Control>
              <ErrorMessage
                name="category_id"
                render={(msg) => <span className="error-message">{msg}</span>}
              />
            </Form.Group>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Category;
