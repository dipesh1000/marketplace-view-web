import { ErrorMessage } from "formik";
import React, { useState, useEffect } from "react";

const ExtraServiceItem = ({
  formik,
  options,
  item,
  CustomInput,
  CustomSelect,
  CustomHiddenInput,
  CustomCheckbox,
  index,
  form,
}) => {
  // eslint-disable-next-line
  const [otherExtra, setOtherExtra] = useState(0);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const handleOtherExtra = (e) => {
    setOtherExtra((prev) => !prev);

    form.setFieldValue(e.target.name, e.target.checked);
  };
  useEffect(() => {
    setCount((prev) => prev + 1);

    setOtherExtra(
      form.values.extra_services?.filter(
        (old) => old.meta_id?.toString() === item.id?.toString()
      )[0]
        ? true
        : false
    );
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    form.setFieldValue(e.target.name, e.target.value);
  };

  return (
    <div className="title-wrapper-inline">
      <div className="inline-title-wrap ">
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            name={`extra_services[${index}]['active']`}
            defaultChecked={
              form.values.extra_services[index].active === 1 ||
              form.values.extra_services[index].active === true
                ? true
                : false
            }
            onChange={(e) => handleOtherExtra(e)}
          />
          {/* <div
            className={`custom-checkbox   ${otherExtra ? "active" : null}` }
          /> */}
        </div>
        <div className="extra-title">{item.extra_service_title}</div>
      </div>

      {form.values.extra_services[index]?.active === 1 ||
      form.values.extra_services[index]?.active === true ? (
        <div className="extra-list-inline">
          <div className="extra-detail">
            {/* <input type="hidden" name={`extra_services[${index}]['active']`} value={form.values.extra_services[index].active} /> */}
            <input
              type="hidden"
              name={`extra_services[${index}]['meta_id']`}
              value={item.id}
            ></input>
            <input
              type="hidden"
              name={`extra_services[${index}]['has_additional_days']`}
              value={item.requires_additional_days}
            ></input>
            <span className="first-label">for an extra</span>
            {/* <InputGroup> */}
            {/* <Form.Control> */}
            <input
              type="number"
              name={`extra_services[${index}]['extra_price']`}
              value={form.values.extra_services[index].extra_price}
              onChange={(e) => handleChange(e)}
              className="form-control"
            ></input>
            <ErrorMessage
              name={`extra_services[${index}]['extra_price']`}
              render={(msg) => <span className="error-message">{msg}</span>}
            />

            {/* </Form.Control> */}
            {/* </InputGroup> */}
            <span className="second-label">
              $ &nbsp;&nbsp;{" "}
              {item.requires_additional_days ? "and additional" : null}
            </span>
            {item.requires_additional_days ? (
              <select
                name={`extra_services[${index}]['additional_day']`}
                onChange={(e) => handleChange(e)}
                className="form-control"
                value={form.values.extra_services[index].additional_day}
              >
                <option value="">Select</option>
                {options?.map((opt) => (
                  <option value={opt.id} key={opt?.id}>
                    {opt.value}
                  </option>
                ))}
              </select>
            ) : null}
            <ErrorMessage
              name={`extra_services[${index}]['additional_day']`}
              render={(msg) => <span className="error-message">{msg}</span>}
            />
            <span className="third-label"></span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ExtraServiceItem;
