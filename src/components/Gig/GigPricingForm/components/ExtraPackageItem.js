import { makeStyles } from "@material-ui/core";
import { ErrorMessage } from "formik";
import React, { useState, useEffect } from "react";

const options = [
  { value: "1 Day", id: "1" },
  { value: "2 Days", id: "2" },
  { value: "3 Days", id: "3" },
  { value: "4 Days", id: "4" },
  { value: "5 Days", id: "5" },
  { value: "6 Days", id: "6" },
  { value: "7 Days", id: "7" },
];

const ExtraPackageItem = ({
  form,
  index,
  CustomSelect,
  active,
  CustomInput,
  CustomHiddenInput,
  item,
  allPackages,
}) => {
  const classes = useStyles();
  // eslint-disable-next-line
  const [extraFast, setExtraFast] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount((prev) => prev + 1);
    setExtraFast(
      form?.values?.package[0].package_price_meta?.filter(
        (old) => old.meta_id?.toString() === item.id?.toString()
      )[0]
        ? true
        : false
    );
    // eslint-disable-next-line
  }, []);

  const handleExtraFast = (e) => {
    setExtraFast((prev) => !prev);
    const multiplePackage = form.values.hasMultiplePackage;
    form.setFieldValue(
      `package[0].package_price_meta[${index}]['active']`,
      e.target.checked
    );
    form.setFieldValue(
      `package[1].package_price_meta[${index}]['active']`,
      e.target.checked && multiplePackage ? e.target.checked : false
    );
    form.setFieldValue(
      `package[2].package_price_meta[${index}]['active']`,
      e.target.checked && multiplePackage ? e.target.checked : false
    );
    form.setFieldValue(
      `package[0].package_price_meta[${index}]['meta_id']`,
      item.id
    );
    form.setFieldValue(
      `package[1].package_price_meta[${index}]['meta_id']`,
      item.id
    );
    form.setFieldValue(
      `package[2].package_price_meta[${index}]['meta_id']`,
      item.id
    );
  };

  const handleChange = (e) => {
    form.setFieldValue(e.target.name, e.target.value);
  };

  return (
    <>
      <div className="title-wrapper">
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            name={`package[0].package_price_meta[${index}]['active']`}
            defaultChecked={
              form.values?.package[0]?.package_price_meta[index]?.active
            }
            onChange={(e) => handleExtraFast(e)}
          />
        </div>
        <div className="extra-title">{item.extra_service_title}</div>
      </div>
      <ul className="extra-list">
        {form.values?.package[0]?.package_price_meta[index]?.active === 1 ? (
          <li>
            <div className="extra-subtitle">{allPackages[0].title}</div>
            <input
              type="hidden"
              name={`package[0].package_price_meta[${index}]['meta_id']`}
            />
            <div className="extra-detail">
              <span className="first-label">I'll deliver in only</span>
              <select
                name={`package[0].package_price_meta[${index}]['additional_value']`}
                onChange={(e) => handleChange(e)}
                className="form-control"
                value={
                  form.values.package[0].package_price_meta[index]
                    ?.additional_value
                }
              >
                <option value="">Select</option>
                {options.map((opt) => (
                  <option value={opt.id}>{opt.value}</option>
                ))}
              </select>
              <ErrorMessage
                name={`package[0].package_price_meta[${index}]['additional_value']`}
              />
              <span className="second-label">for an extra</span>
              <input
                type="number"
                name={`package[0].package_price_meta[${index}]['additional_price']`}
                value={
                  form.values.package[0].package_price_meta[index]
                    ?.additional_price
                }
                onChange={(e) => handleChange(e)}
                className="form-control"
              ></input>
              <ErrorMessage
                name={`package[0].package_price_meta[${index}]['additional_price']`}
              />
              <span className="third-label">$</span>
            </div>
          </li>
        ) : (
          ""
        )}
        {form.values?.package[0]?.package_price_meta[index]?.active === 1 &&
        form.values?.hasMultiplePackage === 1 ? (
          <li>
            <div className="extra-subtitle">{allPackages[1].title}</div>
            <input
              type="hidden"
              name={`package[1].package_price_meta[${index}]['meta_id']`}
            />
            <div className="extra-detail">
              <span className="first-label">I'll deliver in only</span>
              <select
                name={`package[1].package_price_meta[${index}]['additional_value']`}
                onChange={(e) => handleChange(e)}
                className="form-control"
                value={
                  form.values.package[1].package_price_meta[index]
                    ?.additional_value
                }
              >
                <option value="">Select</option>
                {options.map((opt) => (
                  <option value={opt.id}>{opt.value}</option>
                ))}
              </select>
              <ErrorMessage
                name={`package[1].package_price_meta[${index}]['additional_value']`}
              />
              <span className="second-label">for an extra</span>
              <input
                type="number"
                name={`package[1].package_price_meta[${index}]['additional_price']`}
                value={
                  form.values.package[1].package_price_meta[index]
                    ?.additional_price
                }
                onChange={(e) => handleChange(e)}
                className="form-control"
              ></input>
              <ErrorMessage
                name={`package[1].package_price_meta[${index}]['additional_price']`}
              />
              <span className="third-label">$</span>
            </div>
          </li>
        ) : (
          ""
        )}
        {form.values?.package[0]?.package_price_meta[index]?.active &&
        form.values?.hasMultiplePackage === 1 ? (
          <li>
            <div className="extra-subtitle">{allPackages[2].title}</div>
            <input
              type="hidden"
              name={`package[2].package_price_meta[${index}]['meta_id']`}
            />
            <div className="extra-detail">
              <span className="first-label">I'll deliver in only</span>
              <select
                name={`package[2].package_price_meta[${index}]['additional_value']`}
                onChange={(e) => handleChange(e)}
                className="form-control"
                value={
                  form.values.package[2].package_price_meta[index]
                    ?.additional_value
                }
              >
                <option value="">Select</option>
                {options.map((opt) => (
                  <option value={opt.id}>{opt.value}</option>
                ))}
              </select>
              <ErrorMessage
                name={`package[2].package_price_meta[${index}]['additional_value']`}
                render={(msg) => (
                  <span className={classes.errorMessage}>{msg}</span>
                )}
              />
              <span className="second-label">for an extra</span>
              <input
                type="number"
                name={`package[2].package_price_meta[${index}]['additional_price']`}
                value={
                  form.values.package[2].package_price_meta[index]
                    ?.additional_price
                }
                onChange={(e) => handleChange(e)}
                className="form-control"
              ></input>

              <ErrorMessage
                name={`package[2].package_price_meta[${index}]['additional_price']`}
                render={(msg) => (
                  <span className={classes.errorMessage}>{msg}</span>
                )}
              />
              <span className="third-label">$</span>
            </div>
          </li>
        ) : (
          ""
        )}
      </ul>
    </>
  );
};

export default ExtraPackageItem;

const useStyles = makeStyles({
  errorMessage: {
    color: "red",
    fontSize: "12px",
  },
});
