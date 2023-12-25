import React, { useRef, useState } from "react";

function Duration({ form }) {
  const [value, setValue] = useState("");
  const handleDuration = (e) => {
    // eslint-disable-next-line
    [...duration.current?.children]?.map((item) => {
      item.classList.remove("active");
    });
    e.target.classList.add("active");
    form.setFieldValue("delivery_time", e.target.value);
    setValue("");
  };

  const duration = useRef(null);
  return (
    <>
      <div className="time-wrapper">
        <div className="title">
          Once you place your order, when would you like your service delivered?
        </div>
        <ul ref={duration}>
          <li onClick={handleDuration} value="1">
            24 Hours
          </li>
          <li onClick={handleDuration} value="3">
            3 Days
          </li>
          <li onClick={handleDuration} value="7">
            7 Days
          </li>
          <li
            // onClick={handleDuration}
            className={`delivery-time-li ${!value ? "" : "delivery__days"}`}
            value={value}
          >
            <input
              type="number"
              placeholder="Other"
              value={value}
              onClick={handleDuration}
              className="delivery-time-input"
              onChange={(e) => (
                // eslint-disable-next-line
                setValue(e.target.value),
                form.setFieldValue("delivery_time", e.target.value)
              )}
            />
          </li>
        </ul>
      </div>
    </>
  );
}

export default Duration;
