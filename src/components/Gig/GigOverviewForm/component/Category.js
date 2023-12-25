import { ErrorMessage } from "formik";
import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

function Category({ options, category, form, field, serviceType }) {
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
  const findServiceType = (id) => {
    const resultcategory = serviceType
      ?.filter((item) => item.parent_id?.toString() === id?.toString())
      .map((item) => {
        return { id: item.id, value: item.title };
      });
    return resultcategory;
  };
  const [secondaryCategory, setSecondaryCategory] = useState(
    findCategory(field.value?.category)
  );
  const [serviceTypes, setServiceTypes] = useState(
    findServiceType(field.value?.category_id)
  );
  const handleCategoryChange = (e) => {
    form.setValues({
      ...form.values,
      [e.target.name]: e.target.value,
      category_id: "",
      servicetype_id: "",
    });
    setSecondaryCategory(findCategory(e.target.value));
    setServiceTypes([]);
  };
  const handleSubCategoryChange = (e) => {
    form.setValues({
      ...form.values,
      [e.target.name]: e.target.value,
      gig_metas: form.values.gig_metas?.map((list) => ({
        ...list,
        values: [],
      })),
    });
    setServiceTypes(findServiceType(e.target.value));
  };
  const handleServiceTypeChange = (e) => {
    form.setValues({
      ...form.values,
      [e.target.name]: e.target.value,
      gig_metas: form.values.gig_metas?.map((list) => ({
        ...list,
        values: [],
      })),
    });
  };

  return (
    <>
      <div className="d-flex justify-content-between ">
        <div className="label">Category</div>
        <Row className="row">
          <Col sm={6}>
            <Form.Group>
              <Form.Control
                as="select"
                className="select"
                name="category"
                value={form.values.category}
                onChange={handleCategoryChange}
              >
                <option value="" disabled>
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
              >
                <option value="" disabled>
                  Select Category
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
      {serviceTypes?.length > 0 && (
        <div className="d-flex justify-content-between ">
          <div className="label">Service Type</div>
          <Row className="row">
            <Col sm={6}>
              <Form.Group>
                <Form.Control
                  as="select"
                  className="select"
                  name="servicetype_id"
                  value={form.values.servicetype_id}
                  onChange={handleServiceTypeChange}
                >
                  <option value="">Select ServiceTypes</option>
                  {serviceTypes?.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.value}
                    </option>
                  ))}
                  <ErrorMessage
                    name="servicetype_id"
                    render={(msg) => (
                      <span className="error-message">{msg}</span>
                    )}
                  />
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default Category;
